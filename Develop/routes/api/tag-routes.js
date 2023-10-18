const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product],
  })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
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
  // create a new tag
  try {
    const newtag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newtag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.findOne({
      where: { id: req.params.id },
    });
    updatedTag.update({ tag_name: req.body.tag_name });

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
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
  ProductTag.destroy({
    where: {
      tag_id: req.params.id,
    },
  })
    .then((delProdTag) => {
      res.status(200).json(delProdTag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
