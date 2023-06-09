require("dotenv").config()
const { getConection } = require("../config/connection_mysql_database_network");
const { Get_Devices, Get_Clients_Network, Get_Network_Template } = require("../database/database_mongo_operations");

async function getDevicesInNetworksFromCode(codigo) {
    const data = await Get_Devices(codigo);
    return data
}
async function getClientsInNetworksFromCode(codigo) {
    const data = await Get_Clients_Network(codigo);
    return data
}
async function getInformationTemplateFromCode(codigo) {
    const valor = await Get_Network_Template(codigo);
    return valor;
}
async function getSystemUsername(user) {
    const conn = await getConection();
    const valor = await conn.query(process.env.MYSQL_NETWORK_QUERY_USERNAME, user).catch(res => console.log("error " + res));
    return valor
}
async function getSystemIdUser(id) {
    const conn = await getConection();
    const valor = await conn.query(process.env.MYSQL_NETWORK_QUERY_ID_USERNAME, id).catch(res => console.log("error " + res));
    return valor
}

module.exports = {
    getEquiposCentroEducativo: getDevicesInNetworksFromCode,
    getUsername: getSystemUsername,
    getUserId: getSystemIdUser,
    getTemplate: getInformationTemplateFromCode,
    getClientesCentroEducativo: getClientsInNetworksFromCode,

}