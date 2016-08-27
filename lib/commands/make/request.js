/**
 * Make request
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var Bootstrap = require('../../support/bootstrap'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require("fs")),
    log = require('../../support/log'),
    path = require('path'),
    util = require('util');

/**
 * Request
 *
 * @param requestName
 * @constructor
 */
var Request = function (requestName) {

    /**
     * runInApplication
     *
     * @param App
     */
    var runInApplication = function (App) {

        var requestPath = App.config.get('app').requests;

        requestExist(requestPath, requestName)
            .then(function () {
                return readRequest();
            })
            .then(function (request) {
                return makeRequest(request, requestName);
            })
            .then(function (requestCompiled) {
                return writeRequest(requestCompiled, requestName, requestPath);
            })
            .then(function () {
                log.success(
                    util.format("Request %s successfully created!", requestName),
                    true
                );
            })
            .catch(function (e) {
                log.error(e, true);
            });
    };

    // Bootstrap application
    Bootstrap(process.cwd(), runInApplication);
};

/**
 * requestExist
 *
 * @param requestPath
 * @param requestName
 */
function requestExist(requestPath, requestName) {

    return new Promise(function (resolve) {

        if (fs.existsSync(path.resolve(requestPath, requestName + '.js'))) {
            throw new Error(
                util.format("Request %s already exists.", requestName)
            );
        }

        return resolve(true);
    });
}

/**
 * readRequest
 *
 * @return {Promise}
 */
function readRequest() {
    var fileRequest = 'make-request.txt';

    return fs.readFileAsync(path.resolve(__dirname, '../../../repository/request/', fileRequest), 'utf8');
}

/**
 * makeRequest
 *
 * @param request
 * @param requestName
 * @return {Promise}
 */
function makeRequest(request, requestName) {
    return request.replace(/\{\{Request}}/g, requestName);
}

/**
 * writeRequest
 *
 * @param request
 * @param requestName
 * @param requestPath
 * @return {Promise}
 */
function writeRequest(request, requestName, requestPath) {
    return fs.writeFileAsync(path.resolve(requestPath, requestName + '.js'), request);
}

module.exports = Request;
