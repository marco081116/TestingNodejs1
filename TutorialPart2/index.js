const fs = require('fs');

// Có 2 cách
 
// fs.readFile('./files/starter.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString())
// })

fs.readFile('./files/starter.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data)
})
