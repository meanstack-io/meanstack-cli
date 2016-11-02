'use strict';

var meanstack = require('meanstack'),
    auth = require('meanstack/lib/auth'),
    router = meanstack.Router();

/**
 * View dashboard
 */
router.get('/', auth.isAuthenticated, function (req, res) {
    res.render('dashboard');
});

module.exports = router;
