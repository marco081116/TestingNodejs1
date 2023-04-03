const fs = require('fs');

if (!fs.existsSync('./new')) { // nếu không tồn tại thì tạo! hay có thể dùng cho file
    fs.mkdir('./new', (err) => {
        if (err)
            throw err;
        console.log('Directory created')
    })
}

if (fs.existsSync('./new')) { // nếu không tồn tại thì tạo! hay có thể dùng cho file
    fs.rmdir('./new', (err) => {
        if (err)
            throw err;
        console.log('Directory removed')
    })
}
