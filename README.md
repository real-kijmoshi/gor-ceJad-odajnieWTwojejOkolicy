# Restaurant Search App

This is a restaurant search app that allows users to find nearby restaurants based on their preferences.

(this was fastly gebenerated by the template we will change it later)

## Features

- Search for restaurants by location, cuisine, or specific keywords
- View detailed information about each restaurant, including ratings, reviews, and contact information
- Filter search results based on various criteria, such as price range, dietary restrictions, or availability of outdoor seating
- Save favorite restaurants for quick access in the future
- Get directions to a restaurant using integrated maps and navigation services

## Technologies Used

- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js, Express.js
- Database: MongoDB
- External APIs: [Google Maps API](https://developers.google.com/maps/documentation), [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3)

## Installation

1. Clone the repository: `git clone https://github.com/your-username/restaurant-search-app.git`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file and add the necessary API keys and configuration details.
4. Start the server: `npm start`

## .env Configuration

1. **PORT** ← The port you want to use for the web app
2. **CLIENT_ID** ← Auth0 client ID
3. **ISSUER_BASE_URL** ← Auth0 domain
4. **SECRET** ← Auth0 client secret

## Usage

1. Open the app in your web browser.
2. Enter your location or use the geolocation feature to automatically detect your current location.
3. Specify your search criteria, such as cuisine type or price range.
4. Click the "Search" button to retrieve a list of matching restaurants.
5. Explore the search results, view restaurant details, and save your favorites.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).
