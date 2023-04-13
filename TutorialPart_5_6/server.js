// -- include some common core modules
const path = require('path')

// -- address of local host 
const PORT = process.env.PORT || 3500

// -- chưa chạy server nên cần listen for request
server.listen(PORT, () => console.log(
    `Server runs on PORT ${PORT}`
))



    