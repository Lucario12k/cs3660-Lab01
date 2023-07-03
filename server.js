// @ts-check

const express = require("express");
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('client/build'));

app.use("/api/employees", require("./api/employees"));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

(async () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();

