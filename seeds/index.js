
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb+srv://our-first-user:XMZ8AToaFKftwqLP@cluster0.kkqkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
            author: '60d6c00b4393e800155cbfbd',
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
                    url: 'https://res.cloudinary.com/dzkroqk4h/image/upload/v1624455585/YelpCamp/fz4u1iktjndqpuausa1c.jpg',
                    filename: 'YelpCamp/roazbbbes6py7d7opbgk'
                },
                {
                    url: 'https://res.cloudinary.com/dzkroqk4h/image/upload/v1624613759/YelpCamp/j3lv7ebwzp8gtutk8cvp.jpg',
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