const express = require("express");
const { getRestaurants } = require("../utils/alghoritms");
const db = require("../db");
const { authProtected } = require("../utils/auth");

const router = express.Router();

router.get("/restaurants", (req, res) => {
  const restaurants = getRestaurants(req.user.id || 0);
  res.json(restaurants);
});

router.get("/restaurants/:id", (req, res) => {
  const restaurant = db.getRestaurant(req.params.id);
  res.json(restaurant);
});

router.get("/restaurants/:id/menu", (req, res) => {
  const menu = db.getMenuItems(req.params.id);
  res.json(menu);
});

router.get("/restaurants/:id/reviews", (req, res) => {
  const reviews = db.getReviews(req.params.id);
  res.json(reviews);
});

// ---------------------------------------
// PROTECTED ROUTES
// ---------------------------------------

router.post("/restaurants/:id/reviews", authProtected, (req, res) => {
  const { rating, review } = req.body;
  const user_id = req.user.id;
  db.createReview(req.params.id, user_id, rating, review);

  if (!rating || !review) {
    res.status(400).json({ error: "Please provide rating and review" });
    return;
  }

  if (!db.getRestaurant(req.params.id)) {
    res.status(404).json({ error: "Restaurant not found" });
    return;
  }

  if (
    db
      .getReviewsByUser(user_id)
      .filter((review) => review.restaurant_id === req.params.id).length > 0
  ) {
    res
      .status(400)
      .json({ error: "You have already reviewed this restaurant" });
    return;
  }

  db.createReview(req.params.id, user_id, rating, review);
  res.status(201).json({ message: "Review created" });
});

router.put("/restaurants/:id/reviews/:id", authProtected, (req, res) => {
  const { rating, review } = req.body;
  const user_id = req.user.id;
  const review_id = req.params.id;

  if (!rating || !review) {
    res.status(400).json({ error: "Please provide rating and review" });
    return;
  }

  if (!db.getReview(review_id)) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  if (db.getReview(review_id).user_id !== user_id) {
    res.status(403).json({ error: "You are not allowed to edit this review" });
    return;
  }

  db.updateReview(review_id, rating, review);
  res.status(200).json({ message: "Review updated" });
});

router.delete("/restaurants/:id/reviews/:id", authProtected, (req, res) => {
  const user_id = req.user.id;
  const review_id = req.params.id;

  if (!db.getReview(review_id)) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  if (db.getReview(review_id).user_id !== user_id) {
    res
      .status(403)
      .json({ error: "You are not allowed to delete this review" });
    return;
  }

  db.deleteReview(review_id);
  res.status(200).json({ message: "Review deleted" });
});

module.exports = router;
