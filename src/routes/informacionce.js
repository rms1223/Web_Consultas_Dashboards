const express = require('express');
const app = express();
const { isLoggin } = require("../middlewares/autenticated");
const { getNombreCE } = require("../database/database_mysql_inventory_operations")
const { Get_Carteles, Get_CambiosCE, Get_RevisionRed, Get_Total_Aceptaciones_Cartel } = require("../middlewares/query_request")
let render = require("../config/path_render_view_pages");

app.get('/get/carteles/', isLoggin, async function(req, res) {
    const data_request = await Get_Carteles();
    res.json(data_request)
});
app.post('/buscarnombrece/', isLoggin, async function(req, res) {
    let id = req.body.data;
    const nombreCE = await getNombreCE(id);
    res.json(nombreCE)
});
app.post('/total/aceptaciones/cartel/', isLoggin, async function(req, res) {
    let data = req.body.cartel;
    const data_request = await Get_Total_Aceptaciones_Cartel(data);
    res.json(data_request);
});

app.get('/cecambios/', isLoggin, async function(req, res) {
    let ce = await Get_CambiosCE();
    res.render(render.WEB_VIEW_CHANGE_PASSWORD_IN_NETWORK, {
        titulo: "Consultas Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        ce
    });
});
app.get('/revisionredes/', isLoggin, async function(req, res) {
    let ce = await Get_RevisionRed();
    res.render(render.WEB_VIEW_CONTROL_VISIT_BY_NETWORK, {
        titulo: "Consultas Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        ce
    });
});

app.get('/mapageneralcentroseducativos/', isLoggin, async function(req, res) {
    let ce = await Get_RevisionRed();
    res.render(render.WEB_VIEW_GENERAL_MAP_FROM_NETWORKS, {
        titulo: "Consultas Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        ce
    });
});
module.exports = app;