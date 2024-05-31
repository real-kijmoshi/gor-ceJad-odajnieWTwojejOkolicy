const names1 = [
  "Burger",
  "Pizza",
  "Sushi",
  "Tacos",
  "Pasta",
  "Salad",
  "Sandwich",
  "Soup",
  "Steak",
  "Tofu",
];
const names2 = [
  "King",
  "Queen",
  "Prince",
  "Princess",
  "Knight",
  "Dragon",
  "Wizard",
  "Witch",
  "Fairy",
  "Elf",
];
const addresses = [
  "Main St.",
  "First St.",
  "Second St.",
  "Third St.",
  "Fourth St.",
  "Fifth St.",
  "Sixth St.",
  "Seventh St.",
  "Eighth St.",
  "Ninth St.",
];
const keywordsList = [
  "American",
  "Italian",
  "Japanese",
  "Mexican",
  "Chinese",
  "Indian",
  "Thai",
  "Greek",
  "French",
  "Spanish",
];
const phones = [
  "123-456-7890",
  "234-567-8901",
  "345-678-9012",
  "456-789-0123",
  "567-890-1234",
  "678-901-2345",
  "789-012-3456",
  "890-123-4567",
  "901-234-5678",
  "012-345-6789",
];

for (let i = 0; i < 10; i++) {
  const name = `${names1[i]} ${names2[i]}`;
  const address = `${addresses[i]}, ${i + 1}`;
  const phone = phones[i];
  const hours = "9:00 AM - 9:00 PM";
  const website = `http://www.${names1[i].toLowerCase()}-${names2[i].toLowerCase()}.com`;
  const keys = keywordsList[i];
  const image = `https://source.unsplash.com/300x200/?${names1[i]}`;

  db.createRestaurant(name, address, phone, hours, website, keys, image);
}

const descriptions = [
  "Delicious",
  "Tasty",
  "Yummy",
  "Scrumptious",
  "Delectable",
  "Mouth-watering",
  "Appetizing",
  "Flavorful",
  "Savory",
  "Toothsome",
];

for (let i = 0; i < 10; i++) {
  const restaurant_id = i + 1;
  const name = `${descriptions[i]} ${names1[i]}`;
  const description = `A ${keywordsList[i]} ${names1[i].toLowerCase()} dish`;
  const price = `$${(i + 1) * 10}.00`;
  const image = `https://source.unsplash.com/300x200/?${names1[i]}`;

  db.createMenuItem(restaurant_id, name, description, price, image);
}

for (let i = 0; i < 10; i++) {
  const restaurant_id = i + 1;
  const user_id = "123";
  const rating = i + 1;
  const review = `This is a review for ${names1[i]}`;

  db.createReview(restaurant_id, user_id, rating, review);
}

console.log("Database seeded");
