const express = require('express');
const { nanoid } = require("nanoid");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.post("/events", (req, res) => {
    console.info("Received event " + req.body.type);
    switch (req.body.type) {
        case "CommentCreated":
            {
                const commentEvent = {
                    type: "CommentModerated",
                    payload: {
                        id: commentId, content, postId: req.params.id, status: "pending"
                    }
                }

                axios.post("http://localhost:4003/events", commentEvent).catch(e => {
                    console.log("Event bus yanıt dönmedi.")
                });

            }
            break;
    }

    res.end("Ok");
});

app.listen(4004, () => {
    console.log('Listening on 4004');
});
