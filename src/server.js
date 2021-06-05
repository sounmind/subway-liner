import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";

const PORT = 5000;
const app = express();
const logger = morgan("dev");
const handleListening = () => {
  console.log(`Server listening on http://localhost:${PORT}`);
};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);

app.listen(PORT, handleListening);
