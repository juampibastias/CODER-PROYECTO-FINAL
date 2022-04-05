const express = require("express");
const router = express.Router();

//models
const Item = require("../models/Item");

//get items
router.get("/", async (req, res) => {
  try {
    const itemsFromDB = await Item.find();
    res.json(itemsFromDB);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//create item
router.post("/", async (req, res) => {
  console.log(req.body);

  const item = new Item({
    image: req.body.image,
    title: req.body.title,
    marca: req.body.marca,
    details: req.body.details,
    precio: req.body.precio,
    instock: req.body.instock,
  });
  try {
    const newItem = await item.save();
    res.json(newItem);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
