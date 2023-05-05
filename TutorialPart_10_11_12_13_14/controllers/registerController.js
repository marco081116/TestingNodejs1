// -- part 10
// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function(data) {
//         this.users = data
//     }
// }

// const fsPromises = require('fs').promises
// const path = require('path')

// -- part 14
// sau khi đã làm schema User rồi nên không cần khai báo như trên

const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req,res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) {
        return res.status(400).join({'message': 'Username and password are required !!!'})
    }

    // -- check for dulicates in the database:
    // const dulicate = usersDB.users.find(
    //     person => person.username === user
    // )
    // -- part 14 Do đã khai báo User khác đi nên cần update
    const dulicate = await User.findOne({ username: user }).exec()
    
    if (dulicate) {
        return res.sendStatus(409) // -- confilct
    }
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10) 
            // -- bcrypt.hash(password, saltRounds, callback)
                /*  password: A string representing the password that you want to hash
                    saltRounds: A number representing the number of rounds of hashing to apply to the password. More rounds mean a more secure hash, but also slower performance. A value of 10 is a common default.
                    callback: A function to be called once the hash is generated, taking two parameters: an error (if any) and the generated hash.
                */
        // store the new user

        // const newUser = {
        //     "username": user,
        //     // -- part 12
        //     "roles": { "User": 2001 },
        //     "password": hashedPwd,
        // }
        // usersDB.setUsers([...usersDB.users, newUser])
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'), // -- overwrite the existing file
        //     JSON.stringify(usersDB.users), // specify the data type we gonna send
        // )
        // console.log(usersDB.users)
            // Khi khai báo User Schema rồi thì không cần các dòng trên

        // -- part 14
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
        })

        console.log(result)
        res.status(201).json({'message': `new user ${user} created !!!`})
    } catch (err) {
        res.status(500).join({'message': err.message})
    }
}

module.exports = { handleNewUser }