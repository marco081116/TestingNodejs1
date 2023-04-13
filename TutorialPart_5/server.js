// -- include some common core modules
const http = require('http')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises

// -- part 3 4
const logEvents = require('./logEvents');
const EventEmiiter = require('events');
class Emitter extends EventEmiiter { };
// initialize object
const myEmitter = new Emitter();

// -- address of local host 
const PORT = process.env.PORT || 3500

// -- serveFile function cho `fileExists` 
const serveFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath, 'utf-8');
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    } catch(err){
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

// -- define a port -> create a server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    // -- Dạng 1:
    // let filePath;
    // if (req.url === '/' || req.url === 'index.html') {
    //     res.statusCode = 200 // means that the server has successfully processed the request and is returning the requested data as the response (chat GPT)
    //     res.setHeader('Content-type', 'text/html');
    //     filePath = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(path, 'utf-8', (err, data => {
    //         res.end(data) // The server then sends a plain text response of "Hello World" (chat GPT)
    //     }))
    // }

    // -- Dạng 2:
    // let filePath;
    // switch(req.url) {
    //     case('/'):
    //         res.statusCode = 200;
    //         filePath = path.join(__dirname, 'views', 'index.html');
    //         fs.readFile(path, 'utf-8', (err, data => {
    //         res.end(data) // The server then sends a plain text response of "Hello World" (chat GPT)
    //         }))
    // }

    const extension = path.extname(req.url); // get the extension part in file (.txt, .css, .py)

    let contentType; // define content type (.txt, .css, .py)

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    } else {
        // 404
        // 301 redirect
        switch (path.parse(filePath).base) { // .base return file name (/path/to/file.txt => file.txt)
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
})

// -- chưa chạy server nên cần listen for request
server.listen(PORT, () => console.log(
    `Server runs on PORT ${PORT}`
))


// add listener for the log event 
// myEmitter.on('log', (msg) => logEvents(msg));
//     myEmitter.emit('log', 'Log event emitted !!!')