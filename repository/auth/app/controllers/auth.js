'use strict';

var meanstack = require('meanstack'),
    router = meanstack.Router(),
    passport = meanstack.passport,
    mail = meanstack.mail,
    config = meanstack.config,
    auth = require('meanstack/lib/auth'),
    User = require('../models/user'),
    requestSignIn = require('../requests/auth/sign-in'),
    requestSignUp = require('../requests/auth/sign-up'),
    requestForgotSendMail = require('../requests/auth/forgot-send-mail'),
    requestForgotResetPassword = require('../requests/auth/forgot-reset-password'),
    Promise = require('bluebird'),
    util = require('util'),
    moment = require('moment');

// Routes Unauthenticated
router.use(
    [
        '/signin',
        '/signup',
        '/forgot'
    ],
    auth.isUnauthenticated
);

/**
 * View sign in
 */
router.get('/signin', function (req, res) {
    res.render('auth/sign-in');
});

/**
 * Strategy local sign in.
 */
router.post('/signin', requestSignIn, function (req, res, next) {
    passport.authenticate('signin', function (err, user, message) {
        return auth.login(req, res, user, message, next, err);
    })(req, res, next);
});

/**
 * logout.
 */
router.post('/logout', function (req, res) {
    req.setCookieLogin(false).then(function () {
        req.logout();
        req.response.setSuccess();
        return res.json(req.response.return());
    });
});

/**
 * View sign up
 */
router.get('/signup', function (req, res) {
    res.render('auth/sign-up');
});

/**
 * Strategy local sign up.
 */
router.post('/signup', requestSignUp, function (req, res, next) {
    passport.authenticate('signup', function (err, user, message) {
        return auth.login(req, res, user, message, next, err);
    })(req, res, next);
});

/**
 * View forgot password
 */
router.get('/forgot', function (req, res) {
    res.render('auth/forgot');
});

/**
 * Send mail for reset password
 */
router.post('/forgot', requestForgotSendMail, function (req, res, next) {
    var email = req.body.email;

    User.findOne({email: {$regex: email, $options: 'i'}})
        .then(function (user) {
            if (!user) {
                throw new Promise.CancellationError('E-mail not found.');
            }

            return user;
        })
        .then(function (user) {
            user.forgot.token = auth.token();
            // Token expired in 1 hour.
            user.forgot.expires_at = moment().add(1, 'hours');

            return user.save();
        })
        .then(function (user) {
            var settings = config.get('app');

            // Render template email
            return meanstack.mail.template('forgot/token').render(
                {
                    user: user,
                    url: util.format('%sforgot/%s', settings.url, user.forgot.token),
                    app: {
                        name: settings.name,
                        description: settings.description
                    }
                })
                .then(function (mailOptions) {
                    // mailOptions => html compiled and subject.
                    // Add receiver.
                    mailOptions.to = user.email;

                    return mail.sendMail(mailOptions);
                })
                .then(function () {
                    req.response.setSuccess();
                    return res.json(req.response.return("Message has been sent to the e-mail " + user.email));
                })
        })
        .catch(Promise.CancellationError, function (e) {
            return res.status(403).json(req.response.return(e.message));
        })
        .catch(function (e) {
            return next(e);
        });
});

/**
 * View reset password
 */
router.get('/forgot/:token', function (req, res, next) {
    User.findOne({'forgot.token': req.params.token, 'forgot.expires_at': {'$gt': new Date()}})
        .then(function (user) {
            return res.render('auth/' + ((user !== null) ? 'forgot-reset' : 'forgot-token-invalid'));
        })
        .catch(function (e) {
            return next(e);
        });
});

/**
 * Reset password
 */
router.post('/forgot/:token', requestForgotResetPassword, function (req, res, next) {
    User.findOne({'forgot.token': req.params.token, 'forgot.expires_at': {'$gt': new Date()}})
        .then(function (user) {
            if (!user) {
                throw new Promise.CancellationError('Token expired.');
            }

            return user;
        })
        .then(function (user) {
            user.password = req.body.password;
            user.forgot = {};

            return user.save();
        })
        .then(function () {
            req.response.setSuccess();
            return res.json(req.response.return('Updated password, please log in.'));
        })
        .catch(Promise.CancellationError, function (e) {
            return res.status(403).json(req.response.return(e.message));
        })
        .catch(function (e) {
            return next(e);
        });
});

module.exports = router;
