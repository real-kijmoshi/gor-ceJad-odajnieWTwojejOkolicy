require("dotenv").config();
const db = require("better-sqlite3")(`./db/${process.env.ENV}.sqlite3`);
//auth by auth0
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_auth0 TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        address TEXT,
        phone TEXT,
        hours TEXT,
        website TEXT,
        keywords TEXT,
        image TEXT
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
        user_id INTEGER,
        rating INTEGER,
        review TEXT
    )
`);


const createUser = (id_auth0) => {
    const stmt = db.prepare("INSERT INTO users (id_auth0) VALUES (?)");
    stmt.run(id_auth0);
}

const getUser = (id) => {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id);
}

const getUserByAuth0 = (id_auth0) => {
    const stmt = db.prepare("SELECT * FROM users WHERE id_auth0 = ?");
    return stmt.get(id_auth0);
}

const createRestaurant = (name, address, phone, hours, website, keywords, image) => {
    const stmt = db.prepare("INSERT INTO restaurants (name, address, phone, hours, website, keywords, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run(name, address, phone, hours, website, keywords, image);
}

const getRestaurant = (id) => {
    const stmt = db.prepare("SELECT * FROM restaurants WHERE id = ?");
    return stmt.get(id);
}

const getRestaurants = () => {
    const stmt = db.prepare("SELECT * FROM restaurants");
    return stmt.all();
}

const createMenuItem = (restaurant_id, name, description, price, image) => {
    const stmt = db.prepare("INSERT INTO menu_item (restaurant_id, name, description, price, image) VALUES (?, ?, ?, ?, ?)");
    stmt.run(restaurant_id, name, description, price, image);
}

const getMenuItem = (id) => {
    const stmt = db.prepare("SELECT * FROM menu_item WHERE id = ?");
    return stmt.get(id);
}

const getMenuItems = (restaurant_id) => {
    const stmt = db.prepare("SELECT * FROM menu_item WHERE restaurant_id = ?");
    return stmt.all(restaurant_id);
}

const createReview = (restaurant_id, user_id, rating, review) => {
    const stmt = db.prepare("INSERT INTO reviews (restaurant_id, user_id, rating, review) VALUES (?, ?, ?, ?)");
    stmt.run(restaurant_id, user_id, rating, review);
}

const getReview = (id) => {
    const stmt = db.prepare("SELECT * FROM reviews WHERE id = ?");
    return stmt.get(id);
}

const getReviews = (restaurant_id) => {
    const stmt = db.prepare("SELECT * FROM reviews WHERE restaurant_id = ?");
    return stmt.all(restaurant_id);
}

const getReviewsByUser = (user_id) => {
    const stmt = db.prepare("SELECT * FROM reviews WHERE user_id = ?");
    return stmt.all(user_id);
}

module.exports = {
    createUser,
    getUser,
    getUserByAuth0,
    createRestaurant,
    getRestaurant,
    getRestaurants,
    createMenuItem,
    getMenuItem,
    getMenuItems,
    createReview,
    getReview,
    getReviews,
    getReviewsByUser
}




if(process.env.ENV === "dev" && process.argv.includes("-gen")) {
    //generate some data
    const x = 10;
    for(let i = 0; i < x; i++) {
        createUser("auth0|" + Math.floor(Math.random() * 1000000));
    }
    const coolName = ["Burger", "Pizza", "Sushi", "Tacos", "Pasta", "Steak", "BBQ", "Vegan", "Vegetarian", "Seafood"];
    const collSuffix = ["House", "Palace", "Kingdom", "Empire", "Land", "Paradise", "Heaven", "Hell", "Pit", "Hole"];
    const coolAddress = ["123 Main St", "456 Elm St", "789 Oak St", "1011 Pine St", "1213 Maple St", "1415 Cedar St", "1617 Spruce St", "1819 Birch St", "2021 Walnut St", "2223 Chestnut St"];
    const coolPhone = ["123-456-7890", "234-567-8901", "345-678-9012", "456-789-0123", "567-890-1234", "678-901-2345", "789-012-3456", "890-123-4567", "901-234-5678", "012-345-6789"];
    const coolHours = ["8am-8pm", "9am-9pm", "10am-10pm", "11am-11pm", "12pm-12am", "1pm-1am", "2pm-2am", "3pm-3am", "4pm-4am", "5pm-5am"];
    const coolWebsite = ["http://google.com", "http://bing.com", "http://yahoo.com", "http://duckduckgo.com", "http://ask.com", "http://aol.com", "http://lycos.com", "http://altavista.com", "http://webcrawler.com", "http://excite.com"];
    const coolKeywords = ["Burgers", "Pizza", "Sushi", "Tacos", "Pasta", "Steak", "BBQ", "Vegan", "Vegetarian", "Seafood"];
    
    for(let i = 0; i < x; i++) {
        createRestaurant(coolName[i] + " " + collSuffix[i], coolAddress[i], coolPhone[i], coolHours[i], coolWebsite[i], coolKeywords[i], "https://via.placeholder.com/150");
    }

    const coolMenuItemName = ["Burger", "Pizza", "Sushi", "Tacos", "Pasta", "Steak", "BBQ", "Vegan", "Vegetarian", "Seafood"];
    const coolMenuItemDesc = ["Delicious", "Tasty", "Yummy", "Scrumptious", "Delectable", "Mouth-watering", "Appetizing", "Flavorful", "Savory", "Palatable"];
    const coolMenuItemPrice = ["$5", "$10", "$15", "$20", "$25", "$30", "$35", "$40", "$45", "$50"];

    for(let i = 0; i < x; i++) {
        for(let j = 0; j < x; j++) {
            createMenuItem(i + 1, coolMenuItemName[j], coolMenuItemDesc[j], coolMenuItemPrice[j], "https://via.placeholder.com/150");
        }
    }

    const coolRating = [1, 2, 3, 4, 5];
    const coolReview = ["Terrible", "Bad", "Okay", "Good", "Great"];

    for(let i = 0; i < x; i++) {
        for(let j = 0; j < x; j++) {
            createReview(i + 1, j + 1, coolRating[j], coolReview[j]);
        }
    }

    createRestaurant("The Best Restaurant", "123 Main St", "123-456-7890", "8am-8pm", "http://google.com", "Burgers, Pizza, Sushi, Tacos, Pasta, Steak, BBQ, Vegan, Vegetarian, Seafood", "https://via.placeholder.com/150");
    createMenuItem(11, "Burger", "Delicious", "$5", "https://via.placeholder.com/150");
    createMenuItem(11, "Pizza", "Tasty", "$10", "https://via.placeholder.com/150");
    createMenuItem(11, "Sushi", "Yummy", "$15", "https://via.placeholder.com/150");
    createMenuItem(11, "Tacos", "Scrumptious", "$20", "https://via.placeholder.com/150");
    createMenuItem(11, "Pasta", "Delectable", "$25", "https://via.placeholder.com/150");
    createReview(11, 1, 5, "Great");
    createReview(11, 2, 5, "Great");
    createReview(11, 3, 5, "Great");
    createReview(11, 4, 5, "Great");
    createReview(11, 5, 5, "Great");
    createReview(11, 6, 5, "Great");
    createReview(11, 7, 5, "Great");
    createReview(11, 8, 5, "Great");
    createReview(11, 9, 5, "Great");
    createReview(11, 10, 5, "Great");
    createReview(11, 11, 5, "Great");
    createReview(11, 12, 5, "Great");
    createReview(11, 13, 5, "Great");
    createReview(11, 14, 5, "Great");
}
