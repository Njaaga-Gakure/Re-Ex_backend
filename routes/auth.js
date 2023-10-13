const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");
const authenticateUser = require("../middleware/authentication");

router.route("/register").post(Auth.register);
router.route("/login").post(Auth.login);
router.route("/updateUser").patch(authenticateUser, Auth.updateUser);

module.exports = router;
