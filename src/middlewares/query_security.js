const bcrypt = require("bcryptjs");
const hash = require('crypto');

const helpers = {}

helpers.generatedHash = async(pass, user) => {
    try {
        return hash.createHash("sha256").update(user + pass + Date.now()).digest("hex");
    } catch (err) {
        console.log("Error " + err);
    }
}

helpers.encryptPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;

    } catch (error) {
        console.log("Error: " + error);
    }

};


helpers.matchPassword = (password, savedPassword) => {
    try {
        return bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log("Error: " + e);
    }
}


module.exports = helpers;