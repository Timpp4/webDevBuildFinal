const express = require("express");
const { registerHelper } = require("hbs");
const router = express.Router();
const authentication = require("../controllers/auth")

router.get("/", authentication.isLoggedIn, (req, res) => {
    res.render("index", {
        user: req.user
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/profile", authentication.isLoggedIn, (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.render("profile", {
            user: req.user
        });
    } else {
        res.redirect("/login");
    }
    
});

router.get("/posts", authentication.posts, (req, res) => {
    res.render("posts", {
        message: req.message
    });
});

module.exports = router;