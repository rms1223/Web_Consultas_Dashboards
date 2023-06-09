const express = require('express');
let render = require("../config/path_render_view_pages");
const app = express();
const { isLoggin } = require("../middlewares/autenticated");
const { getNombreCE, getAceptaciones } = require("../database/database_mysql_inventory_operations")

app.post('/buscaraceptacionesce/', isLoggin, async function(req, res) {
    let id = req.body.id;

    const aceptaciones = await getAceptaciones(id);
    const nombreCE = await getNombreCE(id);
    res.render(render.WEB_VIEW_ACCEPTANCES_SEARCH, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        aceptaciones,
        isListen: true,
        centro_educativo: "Centro Educativo: " + nombreCE,
    });
});
app.get('/buscaraceptaciones/', isLoggin, async function(req, res) {
    res.render(render.WEB_VIEW_ACCEPTANCES_SEARCH, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });


});
app.get('/registraraceptacion/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_ACCEPTANCES_REGISTER, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });


});
app.get('/aceptacionescartel/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_ACCEPTANCES_BY_CARTEL, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });


});
module.exports = app;