const express = require('express');
const { nanoid } = require("nanoid");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const eventLog = [];
app.get("/events", (req, res) => {
    res.send(eventLog);
})

app.post('/events', (req, res) => {
    eventLog.push(req.body);

    axios.post("http://localhost:4000/events", req.body).catch(e => {
        console.log("4000 e istek başarısız")
    });
    axios.post("http://localhost:4001/events", req.body).catch(e => {
        console.log("4001'e istek başarısız")
    });
    axios.post("http://localhost:4002/events", req.body).catch(e => {
        console.log("4002'e istek başarısız")
    });
    axios.post("http://localhost:4004/events", req.body).catch(e => {
        console.log("4003'e istek başarısız")
    });

    res.end("OK")
});


app.listen(4003, () => {
    console.log('Eventbus | Listening on 4003');
});
