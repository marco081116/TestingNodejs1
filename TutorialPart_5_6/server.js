// -- part 6
const express = require('express'); // framework của node js
const app = express();

// -- include some common core modules
const path = require('path')

// -- address of local host 
const PORT = process.env.PORT || 3500

// -- 
app.get('^/$|/index(.html)?', (req, res) => { 
            // '^' => phải bắt đầu với /; '$' => phải kết thúc với /; '|' => toán tử OR 
            // (.html)?  là optional
    // res.send('Hello !!!');
    // -- chuyền file vào
    // -- cách  1:
    // res.sendFile('./views/index.html', { root: __dirname })
    // -- cách 2:
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
}) 

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html') // chuyển old thành new mãi mãi
}) 

// -- route handlers

app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello world !!!')
    console.log('Test load data')
})

app.get('/*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', '404.html')) // status vẫn 200, ko phải 404 lỗi thật nên cần phải custom lại
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// -- chưa chạy server nên cần listen for request
app.listen(PORT, () => console.log(
    `Server runs on PORT ${PORT}`
))



    