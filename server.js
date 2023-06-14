// @ts-check

const { Client } = require("pg");
const express = require("express");
const path = require('path');
const app = express();
const port = 8080;

const dbClient = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

app.use(express.static('client/build'));

app.get("/employees", async (req, res) => {
  const results = await dbClient
    .query("SELECT * FROM employees")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

(async () => {
  await dbClient.connect();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();

