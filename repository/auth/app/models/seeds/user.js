'use strict';

var faker = require('faker'),
    User = require('../user');

// One register.
var data = {
    username: 'MEANStack',
    email: 'user@example.com',
    password: 'meanstack'
};

module.exports = {
    document: {
        data: data
    },
    model: User
};
