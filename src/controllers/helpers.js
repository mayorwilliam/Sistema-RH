const bcrypt = require('bcryptjs')


const helpers = {}

helpers.encryptPass = async (password) => {
      // const salt = await bcrypt.genSalt(10) // 10 es el número que se ejecuta el codigo, entre más veces pongas más seguro el cifrado de la contraseña pero también tarda más
      const hash = await bcrypt.hash(password,10)
      console.log(hash)
      return hash
}

helpers.matchPass = async (password, savePassword) => {
  try {
      return await bcrypt.compare(password,savePassword)
  } catch (e) {
    console.log(e)
  }
}


module.exports = helpers