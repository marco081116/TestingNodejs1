// lorem file là file to
const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf-8'});

const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', (dataChunk) => { // lắng nghe dữ liệu vào
//     ws.write(dataChunk);
// })

rs.pipe(ws); // cái này sẽ nhanh và ngon hơn cái bên trên