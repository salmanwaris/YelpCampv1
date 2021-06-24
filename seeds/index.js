
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60d41e273072470580c73a44',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },

            images: [
                {
                    url: 'https://res.cloudinary.com/dzkroqk4h/image/upload/v1624366312/YelpCamp/roazbbbes6py7d7opbgk.jpg',
                    filename: 'YelpCamp/roazbbbes6py7d7opbgk'
                },
                {
                    url: 'https://res.cloudinary.com/dzkroqk4h/image/upload/v1624455290/YelpCamp/p9ne6ibbmihomw0x6y7t.jpg',
                    filename: 'YelpCamp/odfe4mdlyx7pumwgzgxj'
                }
            ]
        })
        await camp.save();
    }

}
seedDB().then(() => {
    mongoose.connection.close();
})