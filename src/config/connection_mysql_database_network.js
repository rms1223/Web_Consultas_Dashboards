require("dotenv").config()
const mysql = require("promise-mysql")

const conectionMysqlDatabaseNetwork = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NETWORK,
    dialect: process.env.MYSQL_DIALECT,
    multipleStatements: true,
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    insecureAuth: true

});


function getMysqlConnectionNetwork() {
    return conectionMysqlDatabaseNetwork;
}


module.exports = { getConection :getMysqlConnectionNetwork }