require("dotenv").config()
const AXIOS = require('axios');
const { getConection } = require("../config/connection_mysql_database_network");
let api_router = require("../config/path_api_routes");
async function getTokenApi() {
    const conn = await getConection();
    const valor = await conn.query(process.env.MYSQL_NETWORK_QUERY_TOKEN).catch(res => console.log("error " + res));
    if (valor.length > 0) {
        return valor[0].token_api_fod.toString();
    } else {
        return "Token is not valid"
    }
}

const getHeaderQueryApi = async() => {
    let token = await getTokenApi();
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-fod-api-key': token
    }

    return headers;
}

const getTotalDevicesInAlldashboard = async() => {

    let header = await getHeaderQueryApi();
    return await AXIOS.get(api_router.API_NETWORK_QUERY_ALLDEVICE_IN_DASHBOARDS, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}
const getTotalDevicesInDashboard = async(dashboard_name) => {
    let header = await getHeaderQueryApi();
    let url = api_router.API_NETWORK_QUERY_DEVICE_IN_DASHBOARD + dashboard_name
    return await AXIOS.get(url, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

const sendArubaToolPingFromSerial = async(serial, ip) => {

    let header = await getHeaderQueryApi();
    return await AXIOS.get(api_router.API_NETWORK_QUERY_ARUBA_TOOL_PING + serial + "/" + ip, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

const getAllCarteles = async() => {
    let header = await getHeaderQueryApi();
    return await AXIOS.get(api_router.API_NETWORK_QUERY_ALL_CARTELES, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

const sendPostQueryMail = async(dataBody) => {

    let payload = {
        ce: dataBody.ce,
        codigo: dataBody.codigo,
        data: dataBody.data,
        fecha: dataBody.fecha,
        tecnico: dataBody.tecnico,
        estado: dataBody.estado,
        cartel: dataBody.cartel,
        cc: dataBody.cc
    }
    let header = await getHeaderQueryApi();
    return await AXIOS.post(api_router.API_NETWORK_QUERY_SEND_MAIL, payload, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}


const registerPostQueryVisits = async(response_body) => {

    let payload = {
        codigo: response_body.codigo,
        fecha: response_body.fecha,
        tecnico: response_body.tecnico,
        cartel: response_body.cartel,
    }
    let header = await getHeaderQueryApi();
    return await AXIOS.post(api_router.API_NETWORK_QUERY_REGISTER_VISITS, payload, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

const registerQueryPostChangePasswordInDashboard = async(dataBody) => {

    let payload = {
        ce: dataBody.ce,
        codigo: dataBody.codigo,
        data: dataBody.data,
        fecha: dataBody.fecha,
        cartel: dataBody.cartel,
        dashboard: dataBody.dashboard,
    }
    let header = await getHeaderQueryApi();
    return await AXIOS.post(api_router.API_NETWORK_QUERY_CHANGE_PASSWORD, payload, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}


const getChangeInformationInNetworks = async() => {
    let header = await getHeaderQueryApi();
    return await AXIOS.get(api_router.API_NETWORK_QUERY_CHANGE_IN_NETWORK, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

const getCheckNetwork = async() => {
    let header = await getHeaderQueryApi();
    return await AXIOS.get(api_router.API_NETWORK_QUERY_CONTROL_VISIT, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

const getTotalAceptacionesByCartel = async(cartel) => {
    let header = await getHeaderQueryApi();
    let url = api_router.API_NETWORK_QUERY_ACCEPTANCES_BY_CARTEL + cartel;
    return await AXIOS.get(url, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

async function getClientsInNetwork(codigo) {
    let header = await getHeaderQueryApi();
    let url = api_router.API_NETWORK_QUERY_CLIENTS_IN_NETWORK + codigo;
    return await AXIOS.get(url, {
            headers: header
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
    Get_Aruba_Tool_Ping: sendArubaToolPingFromSerial,
    Get_Data_TotalDashbooard: getTotalDevicesInAlldashboard,
    Get_Devices_TotalDashbooard: getTotalDevicesInDashboard,
    Get_Carteles: getAllCarteles,
    Post_SendMail: sendPostQueryMail,
    Post_Registrar_Visita_CE: registerPostQueryVisits,
    Post_Registrar_Cambios_Contrasena: registerQueryPostChangePasswordInDashboard,
    Get_CambiosCE: getChangeInformationInNetworks,
    Get_RevisionRed: getCheckNetwork,
    Get_Total_Aceptaciones_Cartel: getTotalAceptacionesByCartel,
    getClientesRedCE: getClientsInNetwork,
    get_token_dashboard: getTokenApi
}