/**
 * System console log.
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var color = require('./color');

/**
 * Log
 *
 * @constructor
 */
var Log = function () {};

/**
 * error
 *
 * @param msg
 * @param abort
 */
Log.prototype.error = function (msg, abort) {
    var exit = abort || false;

    console.log(color.red(msg));

    if (exit) {
        process.exit(1);
    }
};

/**
 * success
 *
 * @param msg
 * @param abort
 */
Log.prototype.success = function (msg, abort) {
    var exit = abort || false;

    console.log(color.green(msg));

    if (exit) {
        process.exit(1);
    }
};

/**
 * warn
 *
 * @param msg
 */
Log.prototype.warn = function (msg) {
    console.log(color.yellow(msg));
};

/**
 * info
 *
 * @param msg
 */
Log.prototype.info = function (msg) {
    console.log(color.blue(msg));
};

module.exports = new Log();
