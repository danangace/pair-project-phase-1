const bcrypt = require('bcrypt')

function checkPassword(password, password1){
   return bcrypt.compareSync(password, password1); 
}


module.exports = checkPassword