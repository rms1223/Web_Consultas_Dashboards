const express = require('express');
const app = express();
const { isLoggin } = require("../middlewares/autenticated");
const { Post_SendMail } = require("../middlewares/query_request");

app.get('/get/correos/', isLoggin, async function(req, res) {
    res.json({
        datamail: [
            "",
        ]
    })
});

app.post('/sendmail/', isLoggin, async function(req, res) {
    let data = await Post_SendMail(req.body);
    res.json(data.Message);

});


module.exports = app;