// -- part 10
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data
    }
}

const bcrypt = require('bcrypt')

// -- part 11

const jwt = require('jsonwebtoken')
// require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

// -- part 10

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) {
        return res.status(400).join({'message': 'Username and password are required !!!'})
    }

    const foundUser = usersDB.users.find(person => person.username === user)
    if (!foundUser) {
        return res.sendStatus(401) // 401 => unauthorized
    }
    // evalutation password
    const match = await bcrypt.compare(pwd, foundUser.password)

    if (match) {
        // -- part 12
        const roles = Object.values(foundUser.roles)
        // -- part 11
        const accessToken = jwt.sign(
            { 
                "UserInfo": { // check more JWT claims
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' } // Thường là 10mins 15mins, trong này chỉ làm 30s để thấy được
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } // Thường là 10mins 15mins, trong này chỉ làm 30s để thấy được
        )
        
        // -- saving refresh token with current user
        const otherUsers = usersDB.users.filter(
            person => person.username !== foundUser.username
        )
        const currentUser = { ...foundUser, refreshToken}
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        //  cookie có thể bị gây hại trong JS, nhưng với dạng http thì khác
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }) 
            // lưu theo millisecond
        res.json({ accessToken })
        // -- part 10 
        // create JWTs (next part)
        // res.json({'success': `User ${user} is logged in !!!`})
    }
    else {
        return res.sendStatus(401) // 401 => unauthorized
    }
}

module.exports = { handleLogin }