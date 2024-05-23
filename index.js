const express = require('express');
const { getRestaurants } = require('./utils/alghoritms');
const { getRestaurants: getRestaurantsDB } = require('./db');
require('dotenv').config();

const { auth } = require('express-openid-connect');
const { authProtected } = require('./utils/auth');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    auth({
        baseURL: `http://localhost:${process.env.PORT}`,
        authRequired: false,
        auth0Logout: true,
        clientID: process.env.CLIENT_ID,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        secret: process.env.SECRET
    })
);

// TODO:
//get auth from auth0
app.use((req, res, next) => {
    //todo get user from auth0
    req.user = {
        id: 1
    }
    next();
});


app.get("/restaurants", (req, res) => {
    const user_id = req.user.id;

    const restaurants = getRestaurants(getRestaurantsDB(), user_id);
    res.json(restaurants);
});




/* ---------------------------------------
    TO DO:
    - Add a new endpoint for admin users ( )
    - Check if the user is an admin (✓)
    - Return the admin page ( )
--------------------------------------- */

app.get("/admin", authProtected, (req, res) => {
    res.send("Admin page");
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});