/**
 * FileAppend
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
    path = require('path'),
    log = require('./log');

/**
 * FileAppend
 *
 * @param file
 * @constructor
 */
function FileAppend(file) {
    var pathFile = path.resolve(process.cwd(), file);
    var body;
    var index;

    /**
     * Load file
     *
     * @return {boolean}
     */
    this.load = function () {
        if (!fs.existsSync(pathFile)) {
            log.error(
                util.format("File \"%s\" not found.", pathFile)
            );

            return false;
        }

        var file = fs.readFileSync(
            pathFile,
            'utf8'
        );

        body = file.toString().split('\n');

        return true;
    };

    /**
     * Get index
     *
     * @param keySearch
     * @return {boolean}
     */
    this.index = function (keySearch) {
        var bodyTrim = body.map(function (str) {
            return str.trim();
        });

        index = bodyTrim.indexOf(keySearch);

        if (index === -1) {
            log.error(
                util.format("%s => \"%s\" not found.", pathFile, keySearch)
            );

            return false;
        }

        return true;
    };

    this.removeLine = function () {
        body.splice(index, 1);

        index--;
    };

    /**
     * addLine
     *
     * @param line
     */
    this.addLine = function (line) {
        index++;

        body.splice(index, 0, line);
    };

    /**
     * Write File
     */
    this.close = function () {
        fs.writeFileSync(
            pathFile,
            body.join('\n')
        );
    };
}

module.exports = FileAppend;
