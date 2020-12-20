const express = require("express");
const db = require("../app");
const authenticator = require("../controllers/auth");
const router = express.Router();

router.post("/signup", authenticator.signup);
router.post("/login", authenticator.login);
router.post("/postMessage", authenticator.postMessage);
router.get("/logout", authenticator.logout);

module.exports = router;