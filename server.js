const express = require("express");
const http = require("http");
const path = require("path");
const compression = require("compression");

const port = process.env.PORT || 3001;

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "index.html"));
});

http.createServer(app).listen(port, () => {
  console.log(`server started at port: ${port}`);
});
