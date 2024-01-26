const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/data", (req, res) => {
  const { n, m } = req.query;
  if (!n) {
    return res.status(400).send("n is not provided");
  }

  const filePath = path.join(__dirname, `/tmp/data/${n}.txt`);
  if (m) {
    //  return the content of file /tmp/data/n.txt at line number m
    readLineFromFile(filePath, m, (content) => {
      res.send(content);
    });
  } else {
    // return the contents of file /tmp/data/n.txt entirely
    readEntireFile(filePath, (content) => {
      res.send(content);
    });
  }
});

app.listen("8080", () => {
  console.log("Server is running at port 8080");
});

function readLineFromFile(filePath, m, cb) {
  const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
  let content = "";
  let lineNumber = 1;

  stream.on("data", (chunk) => {
    for (let line of AllLines) {
      if (lineNumber == m) {
        content += line;
        stream.close();
        break;
      }
      lineNumber++;
    }
  });
  stream.on("end", () => {
    cb(content);
  });
  stream.on("error", (err) => {
    console.error(`Error: ${err.message}`);
    cb("Error");
  });
}

function readEntireFile(filePath, cb) {
  const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
  let content = "";

  stream.on("data", (chunk) => {
    content += chunk;
  });
  stream.on("end", () => {
    cb(content);
  });
  stream.on("error", (err) => {
    console.error(`Error: ${err.message}`);
    cb("Error");
  });
}
