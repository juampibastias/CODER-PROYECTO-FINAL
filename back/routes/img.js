const express = require("express");
const router = express.Router();

const imgIMG = "../img/"

const path = require("path");

//images path
const imgFolderPath = path.join(__dirname, imgIMG);

//images
router.get("/:imgName", (req, res) => {
  const image = req.params.imgName;
  res.sendFile(`${imgFolderPath}${image}`);
});

module.exports = router;
