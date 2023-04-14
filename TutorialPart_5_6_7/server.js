// -- part 6
const express = require('express'); // framework của node js
const app = express();

// -- include some common core modules
const path = require('path')

// -- address of local host 
const PORT = process.env.PORT || 3500

// -- part 7

// -- custom middleware
// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

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
})

//  -- chaining route handlers

const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res) => {
    console.log('three')
    res.send('Finished !!!!')
}

app.get('/chain(.html)?', [one, two, three])

// --

app.get('/*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', '404.html')) // status vẫn 200, ko phải 404 lỗi thật nên cần phải custom lại
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// -- chưa chạy server nên cần listen for request
app.listen(PORT, () => console.log(
    `Server runs on PORT ${PORT}`
))



    