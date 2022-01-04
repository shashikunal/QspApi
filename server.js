import express from "express";
import { PORT, NODE_ENV } from "./Config/index";
let app = express();

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`server is running on ${NODE_ENV} MODE &&  port number   ${PORT}`);
});
