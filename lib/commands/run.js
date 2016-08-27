/**
 * Run application.
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var childProcess = require('child_process'),
    log = require('../support/log'),
    verifyApplication = require('../support/verifyApplication'),
    util = require('util');

/**
 * Run application MEANStack
 *
 * @param options
 */
var Run = function (options) {

    // verify if is application MEANStack
    verifyApplication();

    childProcess.execSync(source(options), {stdio: 'inherit'}, function (err) {
        if (err) {
            log.error(err, true);
        }
    });
};

/**
 * Return source.
 *
 * @param options
 * @returns {string}
 */
function source(options) {

    var source = [];

    if (options.debug) {
        source.push(util.format('DEBUG=%s', options.debug));
    }

    if (options.nodeEnv) {
        source.push(util.format('NODE_ENV=%s', options.nodeEnv));
    }

    if (options.port) {
        source.push(util.format('PORT=%s', options.port));
    }

    if (options.nodemon === true || options.nodemon === 'true') {
        source.push('nodemon');
    } else {
        source.push('node');
    }

    if (options.index) {
        source.push(options.index);
    }

    return source.join(' ');
}

module.exports = Run;
