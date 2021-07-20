const express = require('express');
const { nanoid } = require("nanoid");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = nanoid();
    const { title } = req.body;
    posts[id] = { id, title };
    const postEvent = {
        type: "PostCreated",
        payload: {
            id, title
        }
    }
    axios.post("http://localhost:4003/events", postEvent);
    res.send(posts[id]);
});

app.post("/events", (req, res) => {
    console.info("Received event " + req.body.type);
    res.end("Ok");
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
