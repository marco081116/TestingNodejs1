const fs = require('fs');
const path = require('path')

// Có 2 cách
 
// fs.readFile('./files/starter.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString())
// })

// fs.readFile('./files/a.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })


fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data)
})

// console.log('Hello) // Nó sẽ output trc rồi mới đọc file

fs.writeFile(path.join(__dirname, 'files', 'end.txt'), 'Hello Marco !!!', (err) => {
    if (err) throw err;
    console.log('Write completed !!!')
})

process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error : ${err}`);
    process.exit(1)
})