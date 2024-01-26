const fs = require("fs");
const path = require("path");
const dataDir = "/tmp/data";
fs.mkdirSync(dataDir, { recursive: true });

for (let i = 1; i <= 30; i++) {
  const filePath = path.join(dataDir, `${i}.txt`);
  const randomContent = Buffer.from(
    require("crypto").randomBytes(65536)
  ).toString("base64");
  fs.writeFileSync(filePath, randomContent);
  console.log(`File created: ${filePath}`);
}
