const express = require("express");
const { getRestaurants } = require("./utils/alghoritms");
const { getRestaurants: getRestaurantsDB } = require("./db");
const db = require("./db");
require("dotenv").config();

const { auth } = require("express-openid-connect");
const { authProtected } = require("./utils/auth");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  auth({
    baseURL: `http://localhost:${process.env.PORT}`,
    authRequired: false,
    auth0Logout: true,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
  }),
);

app.use((req, res, next) => {
  req.user = {
    id: req.oidc.isAuthenticated() ? req.oidc.user.sid : null,
  };
  next();
});

app.use("/api", require("./routers/api"));
app.use("/admin", require("./routers/admin"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// ---------------------------------------
// SEED DATABASE
// ---------------------------------------

if (process.env.ENV === "dev" && db.getRestaurants().length === 0) {
  require("./utils/seed");
  console.log("Database seeded");
}
