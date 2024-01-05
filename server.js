const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "html");
      const contents = fs.readFileSync("index.html");
      res.end(contents);
    }
    if (req.url.startsWith("/static")) {
      const shiftUrl = req.url.slice(7);
      const path = "./assets" + shiftUrl;
      const contents = fs.readFileSync(path);
      if (path.endsWith("jpg")) {
        res.setHeader("Content-Type", "image/jpg");
      } else if (path.endsWith("css")) {
        res.setHeader("Content-Type", "text/css");
      }
      res.end(contents);
    }
  }
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
