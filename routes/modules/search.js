const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(item => {
        return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.name_en.toLowerCase().includes(keyword.toLowerCase())
      })
    })
    .then(searchResult => res.render('index', { restaurants: searchResult, keyword }))
    .catch(error => console.log(error))
})

module.exports = router