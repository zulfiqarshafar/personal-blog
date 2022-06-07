import Categories from "../models/Categories.js";

const categoryController = {};

// @desc    Get all category.
// @route   GET /categories
categoryController.get_categories = async (req, res) => {
  const categories = await Categories.find().sort("name");

  res.status(200).send(categories);
};

export default categoryController;
