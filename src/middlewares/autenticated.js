let router = require("../config/path_internal_routes");

module.exports = {
    isLoggin(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect(router.WEB_ROUTE_REDIRECT);
    },
    isNotLoggin(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect(router.WEB_ROUTE_INIT);
    }
}