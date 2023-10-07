const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");

//register a user
// router.route("/register").post(authController.register);
router.post("/register", authController.register);

//login a user
router.post("/login", authController.login);

//logging user out
router.get("/logout", authController.logout);
//checking if user is logged in or not
router.get("/isloggedin", authController.isLoggedIn);

// router.route("/login").post(authController.login);
// router.get("/", "./../public/html/index.html");
module.exports = router;
