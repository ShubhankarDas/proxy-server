import express from "express";
import fetch from "node-fetch";
import cors from "cors";
// import validator from "validator";

const app = express();
app.use(cors());

app.get("/proxyImage", async (req, res) => {
  console.log("hit");
  // const isChrome = req.headers["user-agent"].match(/chrome/);
  // if (!isChrome) {
  //   console.log("is not chrome");
  //   return res.status(400).send("Invalid request");
  // }

  const imageUrl = req.query.url;
  // if (!imageUrl || !validator.isURL(imageUrl)) {
  //   return res.status(400).send("Invalid image URL");
  // }

  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set("Content-Type", response.headers.get("content-type"));
    res.send(buffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on port 3000");
});
