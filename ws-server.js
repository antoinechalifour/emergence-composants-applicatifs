const WebSocket = require("ws");

const port = 8080;

const wss = new WebSocket.Server({ port }, () =>
  console.log(`WS server running @ localhost:${port}`)
);

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = JSON.parse(data);

    ws.send(
      JSON.stringify({
        id: Date.now().toString(),
        contenu: message.contenu.split("").reverse().join(""),
      })
    );
  });
});
