const fs = require('fs');
const { join } = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../patterns/models/users.model');

const pub_key = fs.readFileSync(join(__dirname, '/pub_key.pem'));

const options = {
    secretOrKey: pub_key,
    algorithm: ['rsa'],
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new JwtStrategy(options, (payload, done) => {
    User.findByPk(payload.sub)
        .then((user) => {
            if (user) {
                return done(null, true);
            } else {
                return done(null, false);
            }
        })
        .catch((error) => done(error, null));
});

module.exports = (passport) => {
    passport.use(strategy);
};
