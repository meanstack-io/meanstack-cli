'use strict';

/**
 * Strategy local.
 */
var localStrategy = require('passport-local').Strategy,
    User = require('../../models/user');

/**
 * Strategy local sign in.
 */
module.exports = [
    {
        authentication: 'signin',
        strategy: new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            function (email, password, done) {
                User.findOne({email: new RegExp('^' + email + '$', "i")})
                    .exec()
                    .then(function (user) {
                        if (!user) {
                            return [false, {message: 'Incorrect email.'}];
                        }
                        else if (!user.compareHash('password', password)) {
                            return [false, {message: 'Incorrect password.'}];
                        }

                        // Success
                        return user;
                    }).nodeify(done, {spread: true});
            }
        )
    },
    {
        authentication: 'signup',
        strategy: new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, email, password, done) {
                User.findOne({email: new RegExp('^' + email + '$', "i")})
                    .exec()
                    .then(function (user) {
                        if (user) {
                            return [false, {message: 'E-mail already registered.'}];
                        }

                        var newUser = new User(req.body);

                        return newUser.save()
                            .then(function (user) {
                                return [user];
                            });
                    }).nodeify(done, {spread: true});
            }
        )
    }
];
