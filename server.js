import express from "express";
import morgan from "morgan";
import colors from "colors";
import { BootCamp } from "./Routes/bootcamp";
import { PORT, NODE_ENV } from "./Config/index";
import { connectDb } from "./Config/db";
let app = express();

//connect Db
connectDb();
//LOGGER
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//ROUTES BLOCK
app.use("/api/v1/bootcamps", BootCamp);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(
    `server is running on ${NODE_ENV} MODE && Port number ${PORT}`.green.bold
  );
});
