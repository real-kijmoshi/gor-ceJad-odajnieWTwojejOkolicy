require("dotenv").config();
const db = require("better-sqlite3")(`./db/${process.env.ENV}.sqlite3`);
//auth by auth0
db.exec(`
    CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        address TEXT,
        phone TEXT,
        hours TEXT,
        website TEXT,
        keywords TEXT,
        image TEXT,
        ROLES TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS menu_item (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_id INTEGER,
        name TEXT,
        description TEXT,
        price TEXT,
        image TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_id INTEGER,
        user_id TEXT,
        rating INTEGER,
        review TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT,
      auth0_id TEXT
    )
`);

const createRestaurant = (
  name,
  address,
  phone,
  hours,
  website,
  keywords,
  image,
  roles,
) => {
  const stmt = db.prepare(
    "INSERT INTO restaurants (name, address, phone, hours, website, keywords, image, roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  );

  stmt.run(
    name,
    address,
    phone,
    hours,
    website,
    keywords,
    image,
    roles.map((role) => `${role.user}:${role.role}`).join(","),
  );
};

const getRestaurant = (id) => {
  const stmt = db.prepare("SELECT * FROM restaurants WHERE id = ?");
  return stmt.get(id);
};

const getRestaurants = () => {
  const stmt = db.prepare("SELECT * FROM restaurants");
  return stmt.all();
};

const createMenuItem = (restaurant_id, name, description, price, image) => {
  const stmt = db.prepare(
    "INSERT INTO menu_item (restaurant_id, name, description, price, image) VALUES (?, ?, ?, ?, ?)",
  );
  stmt.run(restaurant_id, name, description, price, image);
};

const getMenuItem = (id) => {
  const stmt = db.prepare("SELECT * FROM menu_item WHERE id = ?");
  return stmt.get(id);
};

const getMenuItems = (restaurant_id) => {
  const stmt = db.prepare("SELECT * FROM menu_item WHERE restaurant_id = ?");
  return stmt.all(restaurant_id);
};

const createReview = (restaurant_id, user_id, rating, review) => {
  const stmt = db.prepare(
    "INSERT INTO reviews (restaurant_id, user_id, rating, review) VALUES (?, ?, ?, ?)",
  );
  stmt.run(restaurant_id, user_id, rating, review);
};

const getReview = (id) => {
  const stmt = db.prepare("SELECT * FROM reviews WHERE id = ?");
  return stmt.get(id);
};

const getReviews = (restaurant_id) => {
  const stmt = db.prepare("SELECT * FROM reviews WHERE restaurant_id = ?");
  return stmt.all(restaurant_id);
};

const getReviewsByUser = (user_id) => {
  const stmt = db.prepare("SELECT * FROM reviews WHERE user_id = ?");
  return stmt.all(user_id);
};

const getUser = (auth0_id) => {
  const stmt = db.prepare("SELECT * FROM users WHERE auth0_id = ?");
  return stmt.get(auth0_id);
};

module.exports = {
  createRestaurant,
  getRestaurant,
  getRestaurants,
  createMenuItem,
  getMenuItem,
  getMenuItems,
  createReview,
  getReview,
  getReviews,
  getReviewsByUser,

  getUser,
};
