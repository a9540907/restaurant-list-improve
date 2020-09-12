const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/restaurant-list-again', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) //將資料升冪排列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})



app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({
    name, name_en, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:restaurants_id/edit', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.error(error))
})

app.put('/restaurants/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
    .then(list => {
      list.name = name
      list.name_en = name_en
      list.category = category
      list.image = image
      list.location = location
      list.phone = phone
      list.google_map = google_map
      list.rating = rating
      list.description = description
      return list.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

app.delete('/restaurants/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findById(id)
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})