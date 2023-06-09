const express = require('express');
const app = express();
let render = require("../config/path_render_view_pages");
const { isLoggin } = require("../middlewares/autenticated");
const { getNombreCE } = require("../database/database_mysql_inventory_operations");
const { getEquiposCentroEducativo, getTemplate, getClientesCentroEducativo } = require("../database/database_mysql_network_operations");
const { getClientesRedCE } = require("../middlewares/query_request");
const { path } = require('./dashboards');

app.get('/equiposcarteles/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_DEVICE_INFORMATION, {
        titulo: "Consultas Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
    });


});
app.get('/buscarequiposce/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_DEVICE_IN_NETWORK, {
        titulo: "Consultas Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });


});

app.post('/buscarequiposce/', isLoggin, async function(req, res) {
    let id = req.body.id;
    const equipos = await getEquiposCentroEducativo(id);
    const clientes = await getClientesCentroEducativo(id);
    const template = await getTemplate(id);
    const nombreCE = await getNombreCE(id);
    res.render(render.WEB_VIEW_DEVICE_IN_NETWORK, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        equipos,
        clientes,
        isListen: true,
        centro_educativo: "Centro Educativo: " + nombreCE,
        configuracion: "Configuración: " + template
    });


});

app.get('/red/clientes/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_CLIENTS_IN_NETWORK, {
        titulo: "Consultas Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });


});

app.post('/red/clientes/', isLoggin, async function(req, res) {
    let id = req.body.id;
    const clientes = await getClientesRedCE(id);
    const nombreCE = await getNombreCE(id);
    res.render(render.WEB_VIEW_CLIENTS_IN_NETWORK, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        clientes,
        isListen: true,
        centro_educativo: "Centro Educativo: " + nombreCE,
    });


});
module.exports = app;