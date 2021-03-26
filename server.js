const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 }, () =>
  console.log(`WS server running @ localhost:${8080}`)
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
