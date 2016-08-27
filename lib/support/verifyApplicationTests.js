/**
 * Verification testing application.
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    fs = require('fs');

/**
 * verifyApplicationTests
 *
 * @constructor
 */
var verifyApplicationTests = function () {};

/**
 * packageExist
 *
 * @param appPath
 * @return {Boolean}
 */
verifyApplicationTests.prototype.packageExist = function (appPath) {
    return (fs.existsSync(path.join(appPath, 'package.json')));
};

/**
 * dependencyMEANstack
 *
 * @param appPath
 * @return {Boolean}
 */
verifyApplicationTests.prototype.dependencyMEANstack = function (appPath) {
    if (!this.packageExist(appPath)) {
        return false;
    }

    var packageInfo = require(path.join(appPath, 'package.json'));
    return (packageInfo.dependencies && packageInfo.dependencies.meanstack);
};

/**
 * bootstrapFile
 *
 * @param appPath
 * @return {Boolean}
 */
verifyApplicationTests.prototype.bootstrapFile = function (appPath) {
    return (fs.existsSync(path.join(appPath, 'bootstrap', 'index.js')));
};

module.exports = new verifyApplicationTests();
