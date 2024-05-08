const passport = require('passport');
const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(new JWTStratergy(opts, async (jwt_payload, done)=>{
    try {
        const user = await User.findById(jwt_payload._id);
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    } catch (error) {
        console.log("Error in finding user in jwt", error);
        return done(error, false)
    }
}));

module.exports = passport;