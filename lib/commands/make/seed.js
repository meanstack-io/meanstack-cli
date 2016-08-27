/**
 * Make seed
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
 * Seed
 *
 * @param seedName
 * @param option
 * @constructor
 */
var Seed = function (seedName, option) {

    if (!option.model) {
        log.error("Model required.", true);
    }

    /**
     * runInApplication
     *
     * @param App
     */
    var runInApplication = function (App) {

        var seedPath = App.config.get('database').seeds,
            modelPath = App.config.get('app').models;

        seedExist(seedPath, seedName)
            .then(function () {
                return readSeed();
            })
            .then(function (seed) {
                return makeSeed(seed, seedName, seedPath, option.model, modelPath);
            })
            .then(function (seedCompiled) {
                return writeSeed(seedCompiled, seedName, seedPath);
            })
            .then(function () {
                log.success(
                    util.format("Seed %s successfully created!", seedName),
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
 * seedExist
 *
 * @param seedPath
 * @param seedName
 */
function seedExist(seedPath, seedName) {

    return new Promise(function (resolve) {

        if (fs.existsSync(path.resolve(seedPath, seedName + '.js'))) {
            throw new Error(
                util.format("Seed %s already exists.", seedName)
            );
        }

        return resolve(true);
    });
}

/**
 * readSeed
 *
 * @return {Promise}
 */
function readSeed() {
    var fileSeed = 'make-seed.txt';

    return fs.readFileAsync(path.resolve(__dirname, '../../../repository/model/', fileSeed), 'utf8');
}

/**
 * requireModel
 *   Return string for replace in template controller.
 *
 * @param seedPath
 * @param modelPath
 * @param model
 * @return {String}
 */
function requireModel(seedPath, modelPath, model) {
    return path.relative(seedPath, path.join(modelPath, model));
}

/**
 * makeSeed
 *
 * @param seed
 * @param seedName
 * @param seedPath
 * @param model
 * @param modelPath
 * @return {Promise}
 */
function makeSeed(seed, seedName, seedPath, model, modelPath) {

    seed = seed.replace(/\{\{Model}}/g, model);

    seed = seed.replace(/\{\{ModelPath}}/g, requireModel(seedPath, modelPath, model));

    return seed.replace(/\{\{Seed}}/g, seedName);
}

/**
 * writeSeed
 *
 * @param seed
 * @param seedName
 * @param seedPath
 * @return {Promise}
 */
function writeSeed(seed, seedName, seedPath) {
    return fs.writeFileAsync(path.resolve(seedPath, seedName + '.js'), seed);
}

module.exports = Seed;
