const { createBlogService, getBlogService, getBlogByIdService, deleteBlogByIdService, updateBlogByIdService } = require("../services/blog.services");

  
  exports.getBlogs = async (req, res) => {
    try {
      let filters = { ...req.query };
      const excludesFields = ["limit", "page", "sort", "fields", "search"];
  
      excludesFields.forEach((field) => {
        delete filters[field];
      });
  
      // -----------query oparators----------------
      let filterString = JSON.stringify(filters);
  
      filterString = filterString.replace(
        /\b(gt|lt|gte|lte|regex)\b/g,
        (match) => `$${match}`
      );
  
      filters = JSON.parse(filterString);
  
      // {name:{$regex:'kash', $option:i}}
  
      // common-----------------------------------
      let queries = {};
      // ------------pagination------------------
      if (req.query.limit | req.query.page) {
        const { page = 1, limit = 5 } = req.query;
        const skipCategory = (page - 1) * +limit;
        queries.skip = skipCategory;
        queries.limit = +limit;
      }
  
      // single with multi sorting
      if (req.query.sort) {
        let sortCateory = req.query.sort;
        sortCateory = sortCateory.split(",").join(" ");
        queries.sort = sortCateory;
      }
  
      // for projection---------------------------------------------
      if (req.query.fields) {
        let selectCategory = req.query.fields.split(",").join(" ");
        queries.fields = selectCategory;
      }
      // for search---------------------------------
      if (req.query.search) {
        let serachQuery = req.query.search;
        queries.search = serachQuery;
      }
  
      const blogs = await getBlogService(filters, queries);
  
      res.status(200).json({
        status: "success",
        data: blogs,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "can't get the data",
        error: error.message,
      });
    }
  };
  
  
  exports.createBlog = async (req, res) => {
    try {
      const newBlog = await createBlogService(req.body);
  
      res.status(200).json({
        status: "success",
        message: "data inserted successfully!",
        data: newBlog,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "data is not inserted ",
        error: error.message,
      });
    }
  };
  
  
  
  exports.getBlogById = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await getBlogByIdService(id);
  
      res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message,
      });
    }
  };
  
  exports.deleteBlogController = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await deleteBlogByIdService(id);
  
      res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "failed to blog delete",
        error: error.message,
      });
    }
  };
  exports.updateBlogByIdCotnroller = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const blog = await updateBlogByIdService(id, body);
  
      res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "filad to update Blog",
        error: error.message,
      });
    }
  };
  
  exports.updateBlogById = async (req, res) => {
    try {
      const query = req.params.id;
      const blog = await updateBlogByIdService(id);
  
      res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message,
      });
    }
  };
  