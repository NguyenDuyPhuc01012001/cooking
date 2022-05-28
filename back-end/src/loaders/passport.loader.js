const passport = require('passport')

const { jwtStrategy, localStrategy } = require('../apis/plugins/passport')

module.exports = (app) => {
    app.use(passport.initialize())
    passport.use('jwt', jwtStrategy)
    passport.use('local', localStrategy)
    // passport.use('facebook-token', facebookStrategy)
    // passport.use('google-plus-token', googleStrategy)
}
