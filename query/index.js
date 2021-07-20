const express = require('express');
const { nanoid } = require("nanoid");
const cors = require('cors');

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
    res.send(posts[id]);
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
