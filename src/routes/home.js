let router = require("../config/path_internal_routes");
const express = require("express");
const app = express();

app.use(require(router.WEB_ROUTE_MAIL));
app.use(require(router.WEB_ROUTE_DASHBOARD));
app.use(require(router.WEB_ROUTE_ACEPTACIONES));
app.use(require(router.WEB_ROUTE_TOOLS));
app.use(require(router.WEB_ROUTE_INFORMATION));
app.use(require(router.WEB_ROUTE_DEVICES));


app.get('/', function(req, res) {
    res.redirect(router.WEB_ROUTE_REDIRECT);

});
module.exports = app;