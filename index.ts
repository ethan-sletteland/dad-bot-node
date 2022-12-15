import * as http from "http";
import * as path from "path";
import * as fs from "fs";
import * as WebSocket from "ws";
import dadJokes from "./jokes.json"

var NODE_PORT = 4711;

const server: http.Server = http.createServer((req, res) => {

  const url: string = req.url ? (req.url === "/" ? "index.html" : req.url) : 'index.html'
  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html";

  // log the filePath
  console.log(filePath);

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

var WSserver = new WebSocket.Server({server: server})
// const WSserver = new WebSocket.Server({
//   port: NODE_PORT
// });

let sockets: WebSocket[] = [];
const botname = 'DadBot'
WSserver.on('connection', (socket: WebSocket) => {
  sockets.push(socket); 

  // When you receive a message, send that message to every socket.
  socket.on('message', (msg: WebSocket.RawData) => {
    const newMsg: Msg = {name: 'Me', data: msg.toString()}
    sockets.forEach(s => s.send(JSON.stringify(newMsg)));
    sockets.forEach(s => s.send(JSON.stringify(
      {
        name: botname,
        data: dadJokes[Math.floor(Math.random() * dadJokes.length)]
      }
    )));
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', () => {
    sockets = sockets.filter(s => s !== socket);
  });
});

const responses: Msg[] = [
  {name: botname, data:'What?'},
  {name: botname, data:'That seems strange...'},
  {name: botname, data:'Did you know birds are dinasaurs?'},
  {name: botname, data:'Right?'},
]

interface Msg {
  name: string
  data: string
}
