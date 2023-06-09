require("dotenv").config()
const { get_mongodb_connection } = require("../config/connection_mongo_database");

async function getDeviceInformationFromCode(code) {
    const mongodb_connection = await get_mongodb_connection();
    const device = mongodb_connection.collection(process.env.MONGODB_COLLECTION_DEVICE);
    const response_query = await device.aggregate([
            { $match: { 'name': { '$regex': '.*' + code + '.*' } } },
            {
                $lookup: {
                    from: 'devices_status',
                    localField: 'serial',
                    foreignField: 'serial',
                    as: 'estado_dispositivos'
                }
            },
            { "$unwind": "$estado_dispositivos" }
        ]).toArray()
        .catch(err => {
            console.log(err)
        });
    return response_query;
}
async function getNetworkClients(code) {
    const mongodb_connection = await get_mongodb_connection();
    const clients_networks = mongodb_connection.collection(process.env.MONGODB_COLLECTION_CLIENTS);
    const response_query = await clients_networks.find({ 'codigo': code }).toArray();
    return response_query;
}

async function getIdTemplateFromCode(code) {
    try {
        const mongodb_connection = await get_mongodb_connection();
        const networks = mongodb_connection.collection(process.env.MONGODB_COLLECTION_NETWORK);
        const template = mongodb_connection.collection(process.env.MONGODB_COLLECTION_TEMPLATE);
        const request_network = await networks.findOne({ 'codigo': code });
        let response_query = ""
        if (request_network["id_template"] != "No especificado") {
            let valor = await template.find({ 'id': request_network["id_template"] }).toArray();
            response_query = valor[0].name;
        } else {
            response_query = request_network["id_template"];
        }
        return response_query;
    } catch (exception) {
        return "......"
    }

}
module.exports = {
    Get_Devices: getDeviceInformationFromCode,
    Get_Clients_Network: getNetworkClients,
    Get_Network_Template: getIdTemplateFromCode
}