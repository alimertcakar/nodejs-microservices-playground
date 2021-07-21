const express = require('express');
const { nanoid } = require("nanoid");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = nanoid();
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    const commentEvent = {
        type: "CommentCreated",
        payload: {
            id: commentId, content, postId: req.params.id, status: "pending"
        }
    }
    axios.post("http://localhost:4003/events", commentEvent).catch(e => {
        console.log("Event bus yanıt dönmedi.")
    });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});


app.post("/events", (req, res) => {
    console.info("Received event " + req.body.type);

    switch (req.body.type) {
        case "CommentModerated":
            {
                const commentEvent = {
                    type: "CommentUpdated",
                    payload: req.body.payload
                }
                setTimeout(() => {
                    axios.post("http://localhost:4003/events", commentEvent).catch(e => {
                        console.log("Event bus yanıt dönmedi.")
                    });
                }, 5000);
            }
            break;
        default:
    }


    res.end("Ok");
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});
