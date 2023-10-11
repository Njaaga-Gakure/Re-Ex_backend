const express = require("express");
const router = express.Router();

const Auth = require("../controllers/auth");

router.route("/register").post(Auth.register);
router.route("/login").post(Auth.login);

module.exports = router;
