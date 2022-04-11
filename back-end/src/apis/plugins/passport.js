const passport = require('passport')

//passport Jwt
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

//passport Local
const LocalStrategy = require('passport-local').Strategy

const { User } = require('../models/user.model')

const env = require('../../configs/env')

//Passport jwt
const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: env.passport.jwtToken,
    },
    async (jwt_payload, done) => {
        try {
            const { id: userID } = jwt_payload

            const user = await User.findById(userID)

            if (!user) done(null, false)

            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    }
)

//Passport local
const localStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email })

            if (!user) return done(null, false)

            const isCorrectPassword = await user.isPasswordMatch(password)

            if (!isCorrectPassword) return done(null, false)

            return done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
)

module.exports = {
    jwtStrategy,
    localStrategy,
    passport,
}
