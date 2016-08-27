/**
 * Bootstrap application.
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var verifyApplication = require('./verifyApplication'),
    path = require('path');

/**
 * Bootstrap
 *
 * @param appPath
 * @param callback
 */
var Bootstrap = function (appPath, callback) {

    // Verify application
    verifyApplication();

    // Start application
    require(path.join(appPath, 'bootstrap'))(callback);
};

module.exports = Bootstrap;
