const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/chat") {
    fs.readFile("chat.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", msg => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

server.listen(3000, () => console.log("Running on http://localhost:3000"));