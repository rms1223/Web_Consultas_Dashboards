let render = require("../config/path_render_view_pages");
let router = require("../config/path_internal_routes");
const express = require("express");
const app = express();
const passport = require("passport");
const { isNotLoggin } = require("../middlewares/autenticated");

app.get('/login', isNotLoggin, (req, res) => {

    res.render(render.WEB_VIEW_LOGIN, {
        estado: true,
    });

});

app.post('/login', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: router.WEB_ROUTE_INIT,
        failureRedirect: router.WEB_ROUTE_REDIRECT,
        failureFlash: true
    })(req, res, next);
});

app.get('/logout', (req, res) => {

    req.logout();
    res.redirect(router.WEB_ROUTE_REDIRECT);

});
module.exports = app;