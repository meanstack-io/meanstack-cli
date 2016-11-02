/*
 |--------------------------------------------------------------------------
 | Auth
 |--------------------------------------------------------------------------
 |
 */

var path = require('path');

var config = {

    'cookie': 'session.auth',

    'model': path.resolve(__dirname, '../app/models/user'),

    'strategies': [
        path.resolve(__dirname, '../app/services/passport/LocalStrategy')
    ]
};

module.exports = config;
