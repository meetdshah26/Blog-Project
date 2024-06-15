const Article = require("../models/articleModel");

const allowedCategories = ["Food", "Education", "Business", "Positions"];

exports.createArticle = async (req, res) => {
  try {
    if (!allowedCategories.includes(req.body.category))
      return res.status(400).json({
        success: false,
        message: `Select valid category.`,
      });

    const article = await Article.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      slug: convertToSlug(req.body.slug),
    });

    article.__v = undefined;

    res.status(201).json({
      success: true,
      message: "Article added successfully",
      article,
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please choose a different slug.",
      });

    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).select("-__v");
    if (!article)
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });

    res.status(200).json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { slug, category } = req.body;

    if (slug) req.body.slug = convertToSlug(slug);
    if (category && !allowedCategories.includes(category))
      return res.status(400).json({
        success: false,
        message: `Select valid category.`,
      });

    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article)
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
        
    article.__v = undefined;

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article,
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please choose a different slug.",
      });

    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchArticles = async (req, res) => {
  try {
    const query = req.query.q;
    
    const articles = await Article.find({
      $or: [
        { title: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
        { category: new RegExp(query, "i") },
      ],
    })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
