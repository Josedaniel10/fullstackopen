const commentRouter = require("express").Router();
const Comment = require("../models/comment.model");
const Blog = require("../models/blog.model");

/* commentRouter.get("/comments", async (req, res) => {
  const comments = await Comment.find({});

  if (comments.length < 1) {
    return res.json({ message: "There are no comments" });
  }
  res.json(comments);
}); */

commentRouter.get("/:blogId/comments", async (req, res) => {
  const blogId = req.params.blogId;

  const refBlog = await Blog.findById(blogId);

  if (!refBlog) {
    return res.status(404).json({ error: "The referenced blog was not found" });
  }

  const comments = await Comment.find({ blog: refBlog._id });

  if (comments.length < 1) {
    return res.json({ message: "There are no comments yet" });
  }

  res.json(comments);
});

commentRouter.post("/:blogId/comments", async (req, res) => {
  const blogId = req.params.blogId;
  const { text } = req.body;

  const refBlog = await Blog.findById(blogId);

  if (!refBlog) {
    return res.status(404).json({ error: "The referenced blog was not found" });
  }

  if (text.trim().length < 1) {
    return res.status(400).json({ error: "Invalid comment" });
  }

  const savedComment = new Comment({
    text,
    blog: refBlog._id,
  });

  await savedComment.save();
  refBlog.comments = refBlog.comments.concat(savedComment._id);
  res.status(201).json(savedComment);
});

module.exports = commentRouter;
