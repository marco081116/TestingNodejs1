// -- part 6
const express = require('express'); // framework của node js
const app = express();

// -- include some common core modules
const path = require('path')

// -- address of local host 
const PORT = process.env.PORT || 3500

// -- 
app.get('^/$|/index.html', (req, res) => { // '^' => phải bắt đầu với /; '$' => phải kết thúc với /; '|' => toán tử OR 
    // res.send('Hello !!!');
    // -- chuyền file vào
    // -- cách  1:
    // res.sendFile('./views/index.html', { root: __dirname })
    // -- cách 2:
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
}) 



// -- chưa chạy server nên cần listen for request
app.listen(PORT, () => console.log(
    `Server runs on PORT ${PORT}`
))



    