import express from "express";

const PORT = 5000;
const app = express();
const handleListening = () => {
  console.log(`Server listening on http://localhost:${PORT}`);
};

const handleHome = (req, res) => {
  res.send("Hey, I'm home.");
};

app.listen(PORT, handleListening);
app.get("/", handleHome);
