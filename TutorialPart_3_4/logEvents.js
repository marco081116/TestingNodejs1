const { format } = require('date-fns'); //  Trong terminal => npm install date-fns
const { v4: uuid } = require('uuid');


const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}` // Để uuid vô để phân biệt các unique id cho từng các messages
    console.log(logItem) 
    try {
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.err(err);l
    }
}

module.exports = logEvents;

// npm run dev
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
// console.log(uuid())