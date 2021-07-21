const express = require('express');
const { nanoid } = require("nanoid");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());


function handleEvent(event) {
    switch (event.type) {
        case "CommentCreated":
            {
                const newPayload = { ...event.payload };
                newPayload.status = "approved";
                const commentEvent = {
                    type: "CommentModerated",
                    payload: newPayload
                }
                console.log(newPayload);

                setTimeout(() => {
                    axios.post("http://localhost:4003/events", commentEvent).catch(e => {
                        console.log("Event bus yanıt dönmedi.")
                    });
                }, 15000);
            }
            break;
        default:
    }

}

app.post("/events", (req, res) => {
    console.info("Received event " + req.body.type);
    handleEvent(req.body);

    res.end("Ok");
});

app.listen(4004, () => {
    console.log('Listening on 4004');
    axios.get("http://localhost:4003/events").then(res => {
        const data = res.data;
        data.forEach(event => {
            handleEvent(event);
        });
    });
});
