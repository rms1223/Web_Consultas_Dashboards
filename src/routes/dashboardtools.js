const express = require('express');
const app = express();
const { isLoggin } = require("../middlewares/autenticated");
const { Get_Aruba_Tool_Ping } = require("../middlewares/query_request");


app.post('/aruba/tool/ping/', isLoggin, async function(req, res) {
    const data_request = await Get_Aruba_Tool_Ping(req.body.serial, req.body.host);
    res.json(data_request)

});


module.exports = app;