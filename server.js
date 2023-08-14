import express from "express";
import helmet from "helmet";
import data from "./blogs.json" assert { type: "json" };
import { validateBlogPost, validateId } from "./validate.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).send(data);
});

app.get("/:id", validateId, (req, res) => {
  let index = req.index;
  res.status(200).json(data[index]);
});

app.post("/", validateBlogPost, (req, res) => {
  let id = data.length;
  req.body.id = id + 1;
  data.push(req.body);
  res.status(201).json(data);
});

app.put("/:id", validateId, validateBlogPost, (req, res) => {
  let index = req.index;
  req.body.id = data[index].id;
  data[index] = req.body;
  res.status(200).json(data);
});

app.delete("/:id", validateId, (req, res) => {
  let index = req.index;
  data.splice(index, 1);
  res.status(200).json({ message: `Object has been deleted` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
