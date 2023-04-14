// Part 4

const { format } = require('date-fns'); //  Trong terminal => npm install date-fns
const { v4: uuid } = require('uuid');


const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n` // Để uuid vô để phân biệt các unique id cho từng các messages
    console.log(logItem) 
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) { // nếu chưa có thì tạo mới
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

// -- part 7
const logger = (req, res, next) => { // set this to anonymous func
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {logger, logEvents};

// npm run dev
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
// console.log(uuid())