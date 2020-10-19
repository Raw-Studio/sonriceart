var bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

module.exports.comparePassword = (password, passwordC) => {
    return bcrypt.compareSync(password, passwordC);
}

