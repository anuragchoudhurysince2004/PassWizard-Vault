const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewController.getOverview);

router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get(
  "/register",
  authController.isLoggedIn,
  viewController.showRegisterForm
);
router.get("/profile", authController.protect, viewController.showProfile);

module.exports = router;
