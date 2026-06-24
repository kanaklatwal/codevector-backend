require("dotenv").config();

const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CodeVector Products API Running");
});

app.use("/", routes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});