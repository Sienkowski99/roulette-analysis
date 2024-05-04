const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

const client = redis.createClient({
  url: "redis://redis:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

app.get("/", async (req, res) => {
  res.status(200).send("HOME");
});

app.post("/sets/:set/add/:value", async (req, res) => {
  const { set, value } = req.params;
  console.log(`${set}: ${value}`);
  try {
    await client.lPush(set, value);
    res.send(`Data stored for set: ${set}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to store data");
  }
});

app.get("/sets/:set", async (req, res) => {
  const set = req.params.set;
  try {
    const elements = await client.lRange(set, 0, -1);
    res.send(`Data from ${set}: ${elements}`);
  } catch (err) {
    res.status(500).send("Failed to load data");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
