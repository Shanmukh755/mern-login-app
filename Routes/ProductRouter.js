const express = require('express')
const productAuth = require('../Middlewares/AuthProduct')
const router = express.Router()

router.get('/', productAuth, (req, res)=>{
    res.status(200).json([{name: "mobile", price: 30000},{name: "Television", price: 15000} ])
})

module.exports = router