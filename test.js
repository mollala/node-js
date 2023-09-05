const bcrypt = require('bcrypt')

// const encryptedPassword = bcrypt.hashSync("1234",10)
// console.log(encryptedPassword)

const same = bcrypt.compareSync("1234", "$2b$10$3c8YjGJTPO40IpWbMnZ5vuP3tg5lZKHE7njpAGLEXDuXtD7ztsVb2") // sync
console.log(same)