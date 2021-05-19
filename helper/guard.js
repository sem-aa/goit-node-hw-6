const passport = require('passport')
const { HttpCode} = require('../helper/constant')
require('../config/passport')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        let token = null
        if (req.get('Authorization')) {
            token = req.get('Authorization').split(' ')[1]
        }
        // const [, token] = req.get('Authorization')?.split(' ')
        if (!user || err || token !== user.token) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'Unauthorized'
            })
        }
        req.user = user
        return next()
    })(req,res,next)
}

module.exports = guard