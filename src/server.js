const express = require("express");
const morgan = require("morgan")
const app = express();
const hbs = require("hbs");
const cors = require("cors")
const path = require('path');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
let router = require("./config/path_internal_routes");
require("dotenv").config()
require("./middlewares/passport")
var public = path.join(__dirname, "public");
app.use("/static", express.static(public));
app.use("/images", express.static(path.join(__dirname, 'public/images')))
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});
app.use(require(router.WEB_ROUTE_AUTENTICATED));
app.use(require(router.WEB_ROUTE_HOME));
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set('view engine', 'hbs');
hbs.registerHelper("isOnline", function(value) {
    let estado_dispositivo = false;
    let valor = value.toUpperCase();
    if (valor == "ONLINE" || valor == "UP") {
        estado_dispositivo = true;
    }
    return estado_dispositivo;
});
hbs.registerHelper("isAruba", function(value) {
    let estado_dispositivo = false;
    let valor = value.toUpperCase();
    if (valor == "A9004") {
        estado_dispositivo = true;
    }
    return estado_dispositivo;
});
hbs.registerHelper("isData", function(value1, value2) {
    let estado_dispositivo = false;
    if (value1 != null && value2 != null) {
        estado_dispositivo = true;
    }
    return estado_dispositivo;
});


app.listen(app.get("port"), (err) => {
    try {
        if (err) {
            console.log("Error al Iniciar el Puerto" + err);
        }
        console.log("Servidor Iniciado en el Puerto " + app.get("port"));
    } catch (error) {
        res.status(500).json({
            "Message": "Error "+error,
        });
    }
    
});