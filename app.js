const express = require("express");
const fs = require("fs");
const readline = require("readline");
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
      if (content === null) {
        return res.status(404).send("Line not found");
      }
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
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let lineNumber = 1;
  let content = "";

  rl.on("line", (line) => {
    console.log(`Line ${lineNumber}: ${line}`);
    if (lineNumber === parseInt(m)) {
      content = line;
      rl.close();
    }
    lineNumber++;
  });
  rl.on("close", () => {
    cb(content !== "" ? content : null);
  });

  rl.on("error", (err) => {
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
