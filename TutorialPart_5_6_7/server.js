// -- part 6
const express = require('express'); // framework của node js
const app = express();

// -- include some common core modules
const path = require('path')

// -- part 7
const cors = require('cors')
// const logEvents = require('./middleware/logEvents');
const { logger } = require('./middleware/logEvents');  // để logger trong {} vì logEvents có 2 functions
const errorHandler = require('./middleware/errorHandler'); 
        // tạo hàm ảo bên logEvent nên là đổi thành vậy.
        // Từ đó bên dưới chỉ cần app.use(logger)
// -- address of local host 
const PORT = process.env.PORT || 3500

// -- part 7

// custom middleware logger
// app.use((req, res, next) => {
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
//     console.log(`${req.method} ${req.path}`)
//     next()
// })

app.use(logger)

// -- Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500']; 
        // allow to access backend*
        // https://www.yoursite.com => cái link để thực hiện
// -- functions allow cors to do this*
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS !!!'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

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

/*
Chỗ này chúng ta cần phân biệt: app.use and app.all:
    app.use: sử dụng cho middleware và ko chấp nhận regex
    app.all: sử dụng nhiều cho routing và nó apply cho tất cả htpp methods cùng 1 lúc
*/
app.all('/*', (req, res) => { // sửa từ get thành all
    // res.sendFile(path.join(__dirname, 'views', '404.html')) // status vẫn 200, ko phải 404 lỗi thật nên cần phải custom lại
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))

    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
})

// -- custom error 
// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send(err.message)
// })

app.use(errorHandler) // => Đã code file errorHandler

// -- chưa chạy server nên cần listen for request
app.listen(PORT, () => console.log(
    `Server runs on PORT ${PORT}`
))    