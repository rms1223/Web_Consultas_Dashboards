const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('./query_security');
const { getUsername, getUserId } = require("../database/database_mysql_network_operations")


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {

    const rows = await getUsername(username);
    if (rows.length > 0) {
        const user = rows[0];
        const passportValidated = await helpers.matchPassword(password, user.pass_log).catch(res => console.error("Error al procesar la peticion 2 " + res));
        if (passportValidated) {
            done(null, user, req.flash('Success', 'Bienvenido'));
        } else {
            done(null, false, req.flash('message', 'Usuario o Contraseña Incorrectos'));
        }
    } else {
        done(null, false, req.flash('message', 'Usuario No registrado'));
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await getUserId(id);
    done(null, rows[0]);
});