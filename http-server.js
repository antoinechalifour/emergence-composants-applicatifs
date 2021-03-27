const express = require("express");
const SSE = require("express-sse");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const sse = new SSE();
const app = express();
const port = 9090;

app
  .use(compression())
  .use(cors())
  .use(bodyParser.json())
  .get("/api/messages/stream", sse.init)
  .post("/api/messages", (req, res) => {
    const messageReponse = {
      id: Date.now().toString(),
      contenu: req.body.contenu.split("").reverse().join(""),
    };

    sse.send(messageReponse);
    res.status(201).end();
  })
  .listen(port, () => console.log(`HTTP server running @ localhost:${port}`));
