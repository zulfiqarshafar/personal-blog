import Articles from "../models/Articles.js";

const articleController = {};

// @desc    Display list of all articles or display one article.
// @route   GET /articles
articleController.get_articles = async (req, res) => {
  if (req.query.id) {
    let articles = {};

    // Current article
    try {
      articles.currentArticle = await Articles.findByIdAndUpdate(req.query.id, {
        $inc: { viewCount: 1 },
      });
    } catch (err) {
      res.status(500).send(err);
    }

    // Previous article
    try {
      articles.previousArticle = await Articles.findOne({
        _id: { $lt: articles.currentArticle._id },
      }).sort({ createdAt: -1 });
    } catch (err) {
      res.status(500).send(err);
    }

    // Next article
    try {
      articles.nextArticle = await Articles.findOne({
        _id: { $gt: articles.currentArticle._id },
      }).sort({ createdAt: 1 });
    } catch (err) {
      res.status(500).send(err);
    }

    res.status(200).send(articles);
  } else {
    // Get all articles
    Articles.find()
      .sort({ createdAt: -1 })
      .exec((err, data) => {
        if (err) res.status(500).send(err);
        res.status(200).send(data);
      });
  }
};

// @desc    Get top 3 articles
// @route   GET /articles/top
articleController.get_top_articles = (req, res) => {
  Articles.find()
    .sort({ viewCount: -1 })
    .limit(3)
    .exec((err, data) => {
      if (err) res.status(500).send(err);
      res.status(200).send(data);
    });
};

// @desc    Create articles
// @route   POST /articles
articleController.post_article = (req, res) => {
  const article = new Articles(req.body);
  article.save(function (err) {
    if (err) res.status(500).send(err);
    res.status(201).send(article);
  });
};

export default articleController;
