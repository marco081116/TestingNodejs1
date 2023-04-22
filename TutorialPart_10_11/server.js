// -- part 6
const express = require('express'); // framework của node js
const app = express();

// -- include some common core modules
const path = require('path')

// -- part 7
const cors = require('cors')
// -- part 9 
const corsOptions = require('./config/corsOptions')
// const logEvents = require('./middleware/logEvents');
const { logger } = require('./middleware/logEvents');  // để logger trong {} vì logEvents có 2 functions
const errorHandler = require('./middleware/errorHandler'); 
        // tạo hàm ảo bên logEvent nên là đổi thành vậy.
        // Từ đó bên dưới chỉ cần app.use(logger)

// -- part 11
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')

// -- part 10
// const verifyJWT = require('./middleware/verifyJWT');
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

// -- Cross Origin Resource Sharing => Đã cắt code ra

app.use(cors(corsOptions))

// -- custom middleware
// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
// app.use(express.static(path.join(__dirname, '/public')));

// -- middleware for cookie
app.use(cookieParser())

// -- part 8
// -- serve static file
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public'))); 
    // nếu page ko tồn tại lỗi thì đưa 404 cho subdir xài bth
    // không cần xài nữa
   
// -- ROUTES

app.use('/', require('./routes/root')) // -- part 8
// -- part 10
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))

// -- part 11
app.use(verifyJWT); // xài cho mỗi employees

// -- part 10
app.use('/employees', require('./routes/api/employees')) // -- part 8


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