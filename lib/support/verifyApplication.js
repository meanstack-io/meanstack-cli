/**
 * Verify application.
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    log = require('./log'),
    verifyApplication = require('./verifyApplicationTests');

/**
 * Verify
 *
 * @param appPath
 */
var Verify = function (appPath) {

    appPath = appPath || process.cwd();

    if (!verifyApplication.packageExist(appPath)) {
        log.error('Cannot read package.json in the current directory (' + appPath + ')', true);
    }

    if (!verifyApplication.dependencyMEANstack(appPath)) {
        log.error('The package.json not have dependency MEANstack application.', true);
    }

    if (!verifyApplication.bootstrapFile(appPath)) {
        log.error('Cannot read file bootstrap.', true);
    }
};

module.exports = Verify;
