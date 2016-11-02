/**
 * MergeDirs
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See LICENSE
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require("fs"),
    util = require('util'),
    log = require('./log');

var MergeDirs = function (src, dest, dirExistMsg) {

    dirExistMsg = (typeof dirExistMsg === 'undefined') ? true : dirExistMsg;

    var files = fs.readdirSync(src);

    files.forEach(function (file) {
        var srcFile = src + '/' + file;
        var destFile = dest + '/' + file;
        var stats = fs.statSync(srcFile);

        if (stats.isDirectory()) {
            if (!fs.existsSync(destFile)) {
                fs.mkdirSync(destFile, 0x1ed, true);

                log.success(
                    util.format("Directory %s included.", destFile)
                );
            } else if (dirExistMsg) {
                log.error(
                    util.format("Directory %s already exists.", destFile)
                );
            }

            MergeDirs(srcFile, destFile, dirExistMsg);
        } else {
            if (!fs.existsSync(destFile)) {

                fs.writeFileSync(destFile, fs.readFileSync(srcFile));

                log.success(
                    util.format("File %s included.", destFile)
                );
            } else {
                log.error(
                    util.format("File %s already exists.", destFile)
                );
            }
        }
    });
};

module.exports = MergeDirs;
