const express = require('express');
const { getRestaurants } = require('./utils/alghoritms');
const { getRestaurants: getRestaurantsDB } = require('./db');
require('dotenv').config();

const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    - Add a new endpoint for admin users
    - Check if the user is an admin
    - Return the admin page
--------------------------------------- */

app.get("/admin", (req, res) => {
    //todo check if user is admin
    res.send("Admin page");
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});