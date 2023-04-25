// -- part 10
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data
    }
}
// -- part 11
const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async (req, res) => {
    // on client, also delete the access token


    const cookies = req.cookies
    if (!cookies?.jwt) { // check xem có cookie ko? nếu có thì có jwt chưa ?
        return res.sendStatus(204) // no content
    }
    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 1 day
        return res.sendStatus(204) // forbiden
    }

    // delete refresh token in data base
    const otherUser = usersDB.users.filter(person => person.refreshToken !== refreshToken)
    const currentUser = { ...foundUser, refreshToken: '' } // update lại user (xoá refresh token)
    usersDB.setUsers([ ...otherUser, currentUser])

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        // secure: true - only servers on http
    res.sendStatus(204)
        // means not content to send back
}

module.exports = { handleLogout }