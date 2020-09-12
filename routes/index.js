const express = require('express')
// 引入路由模組
const router = express.Router()

const home = require('./modules/home')
const Restaurant = require('./modules/restaurants')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurants', Restaurant)
router.use('/', search)

// 匯出路由器
module.exports = router