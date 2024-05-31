const {
  getReviewsByUser,
  getReviews,
  getRestaurants: getRestaurantsDB,
} = require("../db");

const getRestaurants = (user_id = null) => {
  const restaurants = getRestaurantsDB();
  const userReviews = user_id ? getReviewsByUser(user_id) : [];

  const restaurantsWithReviews = restaurants.map((restaurant) => {
    const reviews = getReviews(restaurant.id);
    return {
      ...restaurant,
      reviews,
    };
  });

  //todo implement fast sorting by hepaSort
  const sortedByRating = restaurantsWithReviews.sort((a, b) => {
    const aRating =
      a.reviews.reduce((acc, review) => acc + review.rating, 0) /
      a.reviews.length;
    const bRating =
      b.reviews.reduce((acc, review) => acc + review.rating, 0) /
      b.reviews.length;
    return bRating - aRating;
  });

  //sort what is best for user
  const sortedByUser = sortedByRating.map((restaurant) => {
    const userReview = userReviews.find(
      (review) => review.restaurant_id === restaurant.id,
    );
    return {
      ...restaurant,
      userReview,
    };
  });

  //find best restaurants for user and by best rating
  const bestForUser = sortedByUser.filter(
    (restaurant) => restaurant.userReview && restaurant.userReview.rating > 3,
  );
  const bestForAll = sortedByUser.slice(0, 5);

  //merge both arrays and remove duplicates by id and sort by rating
  const merged = [...bestForUser, ...bestForAll].reduce((acc, restaurant) => {
    if (!acc.find((r) => r.id === restaurant.id)) {
      acc.push(restaurant);
    }
    return acc;
  }, []);

  return merged
    .map((restaurant) => {
      const rating =
        restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) /
        restaurant.reviews.length;
      return {
        ...restaurant,
        rating: Math.round(rating * 100) / 100,
      };
    })
    .sort((a, b) => b.rating - a.rating);
};

module.exports = {
  getRestaurants,
};
