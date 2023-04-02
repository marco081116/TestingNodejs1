// const fs = require('fs');
const fsPromises = require('fs').promises; // Thêm vào
const path = require('path')

const fileOps = async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8') // Đọc file starter
        console.log(data) 

        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'), data) 

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promise_write.txt'), data) // Viết qua file mới
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promise_write.txt'), '\n\nHello mina !!!') // Viết thêm dữ liệu vào nữa
        await fsPromises.rename(path.join(__dirname, 'files', 'promise_write.txt'), path.join(__dirname, 'files', 'promise_complete.txt')) // Đổi tên file

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promise_complete.txt'), 'utf-8')
        console.log(newData)
    } 
    catch(err) {
        console.log(err)
    }
}

fileOps()

// Có 2 cách
 
// fs.readFile('./files/starter.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString())
// })

// fs.readFile('./files/a.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })


// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })

// console.log('Hello) // Nó sẽ output trc rồi mới đọc file

// fs.writeFile(path.join(__dirname, 'files', 'end.txt'), 'Hello Marco !!!', (err) => {
//     if (err) throw err;
//     console.log('Write completed !!!')
//     // write thêm vào file 
//     fs.appendFile(path.join(__dirname, 'files', 'end.txt'), '\n\nIm Tim !!!', (err) => {
//         if (err) throw err;
//         console.log('Append completed !!!')

//         fs.rename(path.join(__dirname, 'files', 'end.txt'),  path.join(__dirname, 'files', 'new_end.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename completed !!!')
//         })
//     })
// })

// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Hello Marco !!!', (err) => {
//     if (err) throw err;
//     console.log('Append completed !!!')
// })

process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error : ${err}`);
    process.exit(1)
})