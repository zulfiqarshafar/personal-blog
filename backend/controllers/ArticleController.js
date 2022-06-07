import fs from "fs";
import Articles from "../models/Articles.js";
import Categories from "../models/Categories.js";

const articleController = {};

// @desc    Display list of all articles.
// @route   GET /articles
articleController.get_articles = async (req, res) => {
  Articles.find({ isDeleted: false })
    .populate("categories", "name -_id")
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    });
};
// @desc    Display one of article.
// @route   GET /articles/:id
articleController.get_article = async (req, res) => {
  // console.log(req.params.id);

  Articles.findOne({ _id: req.params.id, isDeleted: false })
    .populate("categories", "name -_id")
    .exec((err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    });
};

// @desc    Display list of all published articles or display one published article.
// @route   GET /articles/published
articleController.get_published_articles = async (req, res) => {
  if (req.query.id) {
    let articles = {};

    // Current article
    try {
      articles.currentArticle = await Articles.findOneAndUpdate(
        { _id: req.query.id, isPublished: true, isDeleted: false },
        {
          $inc: { viewCount: 1 },
        },
        { new: true }
      ).populate("categories", "name -_id");
    } catch (err) {
      return res.status(500).json(err);
    }

    // Previous article
    try {
      articles.previousArticle = await Articles.findOne({
        _id: { $lt: articles.currentArticle._id },
        isPublished: true,
        isDeleted: false,
      }).sort({ createdAt: -1 });
    } catch (err) {
      return res.status(500).json(err);
    }

    // Next article
    try {
      articles.nextArticle = await Articles.findOne({
        _id: { $gt: articles.currentArticle._id },
        isPublished: true,
        isDeleted: false,
      }).sort({ createdAt: 1 });
    } catch (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(articles);
  } else {
    // Get all articles
    Articles.find({ isPublished: true, isDeleted: false })
      .populate("categories", "name -_id")
      .sort({ createdAt: -1 })
      .exec((err, data) => {
        if (err) res.status(500).json(err);
        return res.status(200).json(data);
      });
  }
};

// @desc    Get top 3 articles
// @route   GET /articles/top
articleController.get_top_articles = (req, res) => {
  Articles.find({ isPublished: true, isDeleted: false })
    .sort({ viewCount: -1 })
    .limit(3)
    .exec((err, data) => {
      if (err) res.status(500).send(err);
      res.status(200).send(data);
    });
};

// @desc    Create articles
// @route   POST /articles
articleController.post_article = async (req, res) => {
  const reqBody = req.body;

  // Save Category if new
  let articleCategories = [];
  for (const category of reqBody.category) {
    try {
      const articleCategory = await Categories.findOneAndUpdate(
        { name: category },
        {
          $inc: { total: 1 },
        },
        { new: true, upsert: true }
      );

      articleCategories.push(articleCategory.id);
    } catch (error) {
      return res.status(500).json(err);
    }
  }

  // Save Article
  const articleFields = {
    title: reqBody.title,
    content: reqBody.content,
    categories: articleCategories,
    isPublished: reqBody.isPublished,
    publishedAt: reqBody.isPublished ? Date.now() : undefined,
  };

  const article = new Articles(articleFields);
  article.save((err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(201)
      .json({ id: data.id, msg: "Data successfully submitted!" });
  });
};

// @desc    Update articles
// @route   PUT /articles
articleController.put_article = async (req, res) => {
  const reqBody = req.body;

  // Check existing Article
  const article = await Articles.findById(reqBody.articleId);
  if (!article) return res.sendStatus(500).json({ msg: "Article not found!" });

  // Save Category if new
  let articleCategories = [];
  for (const category of reqBody.category) {
    try {
      const articleCategory = await Categories.findOneAndUpdate(
        { name: category },
        {
          $inc: { total: 1 },
        },
        { new: true, upsert: true }
      );

      articleCategories.push(articleCategory.id);
    } catch (error) {
      return res.status(500).json(err);
    }
  }

  // Update Article
  article.title = reqBody.title;
  article.content = reqBody.content;
  article.categories = articleCategories;
  article.isPublished = reqBody.isPublished;
  article.publishedAt = reqBody.isPublished ? Date.now() : undefined;
  article.save((err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(201)
      .json({ id: data.id, msg: "Data successfully submitted!" });
  });
};

// @desc    Delete article
// @route   DELETE /article/:id
articleController.delete_article = async (req, res) => {
  // Check existing Article
  const article = await Articles.findById(req.params.id);
  if (!article) return res.sendStatus(500).json({ msg: "Article not found!" });

  // Update field isDeleted Article
  article.isDeleted = true;
  article.deletedAt = Date.now();
  article.save((err) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ msg: "Data successfully deleted!" });
  });
};

articleController.post_image = async (req, res) => {
  const oldPath = req.file.path;
  const newPath = "/uploads/images/" + req.file.filename;

  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    return res
      .status(200)
      .json({ path: newPath, msg: "File moved succesfully!" });
  });
};

export default articleController;
