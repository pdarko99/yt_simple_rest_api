import data from "./blogs.json" assert { type: "json" };

const validateBlogPost = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  next();
};
const validateId = (req, res, next) => {
  let id = req.params.id;
  let index = data.findIndex((obj) => obj.id === +id);
  if (index !== -1) {
    req.index = index;
    next();
  } else {
    res.status(404).json({ message: `Object with id: ${id} not Found` });
  }
};
export { validateBlogPost, validateId };
