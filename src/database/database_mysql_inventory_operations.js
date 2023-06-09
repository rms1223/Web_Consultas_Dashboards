require("dotenv").config()
const { getConection } = require("../config/connection_mysql_database_inventory");

async function getNetworkNameFromCode(codigo) {
    const conn = await getConection();
    const valor = await conn.query(process.env.MYSQL_NETWORK_QUERY_NETWORK_NAME, codigo).catch(res => console.log("error " + res));
    if (valor == "") {
        return "No existe"
    } else {
        return valor[0].centro_educativo;
    }

}
async function getStatusWorkInNetwork(codigoCe) {
    const conn = await getConection();
    const valor = await conn.query(process.env.MYSQL_NETWORK_QUERY_STATUS_WORK, codigoCe).catch(res => console.log("error " + res));
    return valor
}


module.exports = {
    getNombreCE: getNetworkNameFromCode,
    getAceptaciones: getStatusWorkInNetwork

}