// -- part 8
const express = require('express')
const router = express.Router();
const path = require('path');


router.get('^/$|/index(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// Đã xoá các files liên quan đến subdir
// router.get('/new-page(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
// }) 

// router.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301, '/new-page.html') // chuyển old thành new mãi mãi
// }) 

module.exports = router