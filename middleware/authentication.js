const { validateToken } = require("../services/authentication");

function checkForAuthCookie(cookieName) {

    return function (req, res, next) {
        const tokenCookievalue = req.cookies[cookieName]
        if (!tokenCookievalue){ return next();}

        try {
            const userPayload = validateToken(tokenCookievalue)
            req.user = userPayload
        } catch (err) {

        }
        next()
    }
}

module.exports = { checkForAuthCookie }