import passport from 'passport'
import facebook from 'passport-facebook'
import _ from 'lodash'

const options = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.URL_BASE}/`,
    profileFields: ['emails', 'name', 'picture']
}

function serialization(user, done) {
    done(null, user)
}

function getEmail(profile) {
    return (_.isEmpty(profile.emails)) ? null : profile.emails[0].value
}

function getPhoto(profile) {
    return (_.isEmpty(profile.photos)) ? null : profile.photos[0].value
}

function getName(profile) {
    return (profile.name) ? `${profile.name.givenName} ${profile.name.familyName}` : null
}

passport.use(new facebook.Strategy(options, async (accessToken, refreshToken, profile, cb) => {
    const userData = {
        email: getEmail(profile),
        name: getName(profile),
        photo: getPhoto(profile),
        source: 'facebook'
    }
    return cb(null, userData)
}))

passport.serializeUser(serialization)

passport.deserializeUser(serialization)
