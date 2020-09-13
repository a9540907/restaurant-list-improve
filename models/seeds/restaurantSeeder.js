const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurantJson = require('../../restaurant.json')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantJson.results.length; i++) {

    Restaurant.create({
      id: `${restaurantJson.results[i].id}`,
      name: `${restaurantJson.results[i].name}`,
      name_en: `${restaurantJson.results[i].name_en}`,
      category: `${restaurantJson.results[i].category}`,
      image: `${restaurantJson.results[i].image}`,
      location: `${restaurantJson.results[i].location}`,
      phone: `${restaurantJson.results[i].phone}`,
      google_map: `${restaurantJson.results[i].google_map}`,
      rating: `${restaurantJson.results[i].rating}`,
      description: `${restaurantJson.results[i].description}`,
    })
  }
  console.log('done')
})