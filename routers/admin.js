const express = require("express");
const { getRestaurants } = require("../db");
const db = require("../db");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config();

const router = express.Router();

router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
router.use(flash());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use((req, res, next) => {
  const role = db.getUser(req.user.id).role;
  if (role !== "admin") {
    res.status(403).send("You are not authorized to access this page");
    return;
  }
  next();
});

router.get("/", (req, res) => {
  const restaurants = getRestaurants();

  res.render("admin", { restaurants, message: req.flash("message")[0] });
});

//TO DO ADD IMAGE SUPPORT

router.post("/add", (req, res) => {
  const { name, adress, phone, hours, website, keywords } = req.body;

  if (!name || !adress || !phone || !hours || !website || !keywords) {
    req.flash("message", {
      type: "error",
      message: "Please fill in all fields",
    });
    res.redirect("/admin");
    return;
  }

  db.createRestaurant(name, adress, phone, hours, website, keywords, "", []);

  req.flash("message", { type: "success", message: "Restaurant added" });
  res.redirect("/admin");
});

// TO DO

router.get("/restaurant/:id", (req, res) => {
  const restaurant = db.getRestaurant(req.params.id);
  const menu = db.getMenuItems(req.params.id);
  const reviews = db.getReviews(req.params.id);

  res.render("restaurant", { restaurant, menu, reviews });
});

module.exports = router;
