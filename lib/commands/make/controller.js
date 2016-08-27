/**
 * Make controller
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
 * Controller
 *
 * @param controllerName
 * @param options
 * @constructor
 */
var Controller = function (controllerName, options) {

    /**
     * runInApplication
     *
     * @param App
     */
    var runInApplication = function (App) {

        var controllerPath = App.config.get('app').controllers,
            modelPath = App.config.get('app').models;

        controllerExist(controllerPath, controllerName)
            .then(function () {
                return readController(options.resource);
            })
            .then(function (controller) {
                return makeController(controller, controllerName, controllerPath, modelPath, options);
            })
            .then(function (controllerCompiled) {
                return writeController(controllerCompiled, controllerName, controllerPath);
            })
            .then(function () {
                log.success(
                    util.format("Controller %s successfully created!", controllerName),
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
 * controllerExist
 *
 * @param controllerPath
 * @param controllerName
 */
function controllerExist(controllerPath, controllerName) {

    return new Promise(function (resolve) {

        if (fs.existsSync(path.resolve(controllerPath, controllerName + '.js'))) {
            throw new Error(
                util.format("Controller %s already exists.", controllerName)
            );
        }

        return resolve(true);
    });
}

/**
 * readController
 *
 * @param resource
 * @return {Promise}
 */
function readController(resource) {
    var fileController = (resource) ? 'make-controller-resource.txt' : 'make-controller.txt';

    return fs.readFileAsync(path.resolve(__dirname, '../../../repository/controller/', fileController), 'utf8');
}

/**
 * makeController
 *
 * @param controller
 * @param controllerName
 * @param controllerPath
 * @param modelPath
 * @param options
 * @return {Promise}
 */
function makeController(controller, controllerName, controllerPath, modelPath, options) {
    return (
        controller.replace(/\{\{Controller}}/g, controllerName)
    ).replace(/\{\{Model}}/g, requireModel(controllerPath, modelPath, options));
}

/**
 * requireModel
 *   Return string for replace in template controller.
 *
 * @param controllerPath
 * @param modelPath
 * @param options
 * @return {String}
 */
function requireModel(controllerPath, modelPath, options) {
    if (!options.model) {
        return "";
    }

    return util.format(
        '\nvar %s = require(\'%s\');',
        options.model,
        path.relative(controllerPath, path.join(modelPath, options.model)));
}

/**
 * writeController
 *
 * @param controller
 * @param controllerName
 * @param controllerPath
 * @return {Promise}
 */
function writeController(controller, controllerName, controllerPath) {
    return fs.writeFileAsync(path.resolve(controllerPath, controllerName + '.js'), controller);
}

module.exports = Controller;
