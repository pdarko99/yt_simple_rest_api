import express from "express";
import helmet from "helmet";
import data from "./blogs.json" assert { type: "json" };
import validateBlogPost from "./validate.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).send(data);
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  let index = data.find((obj) => obj.id === +id);
  if (index) {
    res.status(200).json(index);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});

app.post("/", validateBlogPost, (req, res) => {
  let id = data.length;
  req.body.id = id + 1;
  data.push(req.body);
  res.status(201).json(data);
});

app.put("/:id", validateBlogPost, (req, res) => {
  let id = req.params.id;
  let index = data.findIndex((obj) => obj.id === +id);
  if (index !== -1) {
    req.body.id = data[index].id;
    data[index] = req.body;
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Object with id: ${id} not Found` });
  }
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;
  let index = data.findIndex((obj) => obj.id === +id);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(200).json({ message: `Object with id: ${id} has been deleted` });
  } else {
    res.status(404).json({ message: `Object with id: ${id} not Found` });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
