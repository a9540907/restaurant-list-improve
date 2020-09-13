const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' }) //將資料升冪排列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'desc' }) //將資料降冪排列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/rating/asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/rating/desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router