const express = require("express");
const router = express.Router();
const featureController = require("./../controllers/featureController");

//setting route for saving password in database
router.post("/save-pass", featureController.savePassDb);

module.exports = router;
