const express = require('express')
let render = require("../config/path_render_view_pages");
const app = express()
const { isLoggin } = require("../middlewares/autenticated");
const { Get_Data_TotalDashbooard, Get_Devices_TotalDashbooard } = require("../middlewares/query_request")

app.get('/equiposhuawei/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_HUAWEI_CONFIG, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });
});
app.get('/totaldashboard/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_TOTAL_DEVICE_IN_DASHBOARDS, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });
});
app.get('/totalpordashboard/', isLoggin, async function(req, res) {

    res.render(render.WEB_VIEW_TOTAL_DEVICE_BY_DASHBOARD, {
        titulo: "Redes FOD",
        anio: new Date().getFullYear(),
        isListen: false,
        centro_educativo: "",
        configuracion: ""
    });
});
app.get('/totaldashboard/data', isLoggin, async function(req, res) {
    const data_request = await Get_Data_TotalDashbooard();
    res.json(data_request)
});
app.post('/total/devices/dasboard/', isLoggin, async function(req, res) {
    let data = req.body.data
    const data_request = await Get_Devices_TotalDashbooard(data);
    res.json(data_request)
});


module.exports = app;