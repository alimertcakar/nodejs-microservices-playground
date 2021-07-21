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


function handleEvent(event) {
    console.log(event.type);

    switch (event.type) {
        case "PostCreated":
            {
                const { id } = event.payload;
                posts[id] = { ...event.payload, comments: [] };
            }
            break;
        case "CommentCreated":
            {
                const { id, postId } = event.payload;
                posts[postId].comments.push(event.payload);
            }
            break;
        case "CommentUpdated":
            {
                const { id, postId } = event.payload;
                const commentIndex = posts[postId]?.comments.findIndex(val => val.id === id);
                posts[postId].comments[commentIndex] = event.payload;
            }
            break;
        default:
    }


}


app.post("/events", (req, res) => {
    handleEvent(req.body);
    res.end("Ok");
});



app.listen(4002, () => {
    console.log('Listening on 4002');
    axios.get("http://localhost:4003/events").then(res => {
        const data = res.data;
        data.forEach(event => {
            handleEvent(event);
        });
    });
});