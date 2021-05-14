const bcrypt = require('bcrypts')

const helpers = {}


helpers.encryptPass = async(password) => {
    const salto = await bcrypt.getSalt(10)
    const hash = await bcrypt.hash(password,salto)
    return hash

}

helpers.matchPass = async (password, savePassword) => {
    try {
        return bcrypt.compare(password, savePassword)
    } catch (error) {
        console.log(error)
    }

}


module.exports = helpers