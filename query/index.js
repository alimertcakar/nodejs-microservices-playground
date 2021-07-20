const express = require('express');
const { nanoid } = require("nanoid");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {
};

app.get('/posts', (req, res) => {


    res.send(posts);
});

app.post("/events", (req, res) => {
    console.info("Received event " + req.body.type);
    switch (req.body.type) {
        case "PostCreated":
            {
                const { id } = req.body.payload;
                posts[id] = { ...req.body.payload, comments: [] };
            }
            break;
        case "CommentCreated":
            {
                const { id, postId } = req.body.payload;
                posts[postId].comments.push(req.body.payload);
            }
            break;
        default:
    }
    console.log(posts, "posts");
    res.end("Ok");
});


app.listen(4002, () => {
    console.log('Listening on 4002');
});
