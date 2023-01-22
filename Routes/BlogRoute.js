const express = require("express");
const { getBlogs, createBlog, getBlogById, deleteBlogController, updateBlogByIdCotnroller } = require("../Controllers/BlogController");
const router = express.Router();

router.route("/").get(getBlogs).post(createBlog);

router
  .route("/:id")
  .get(getBlogById)
  .delete(deleteBlogController)
  .patch(updateBlogByIdCotnroller);

module.exports = router;
