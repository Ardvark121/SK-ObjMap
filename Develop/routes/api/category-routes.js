const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const CategoryData = await Category.findAll({
      include: [Product],
    });
    if (!CategoryData) {
      res.json({ message: "There is no data inside Categories" });
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [Product],
  })
    .then((results) => {
      if (!results) {
        res.json({ message: "There is no data for that id" });
      }
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const createdcat = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createdcat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value

  try {
    const updatedCat = await Category.findOne({
      where: { id: req.params.id },
    });
    updatedCat.update({ category_name: req.body.category_name });

    res.status(200).json(updatedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delProd) => {
      res.status(200).json(delProd);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
