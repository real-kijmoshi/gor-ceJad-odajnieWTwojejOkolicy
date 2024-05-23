function authProtected(req, res, next) {
    if (req.oidc.isAuthenticated()) {
        return next();
    }
    res.send('User is not authenticated');
}

module.exports = {
    authProtected
}