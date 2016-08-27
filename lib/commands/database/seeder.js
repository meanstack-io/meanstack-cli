/**
 * Database seeder
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var Promise = require('bluebird'),
    path = require('path'),
    fs = require('fs'),
    Bootstrap = require('../../support/bootstrap'),
    log = require('../../support/log');

/**
 * Seeder
 *
 * @param options
 * @constructor
 */
var Seeder = function (options) {

    /**
     * runInApplication
     *
     * @param App
     */
    var runInApplication = function (App) {
        var seeds = loadSeed(App.config.get('database').seeds, options.seed);

        // exec array of seeds
        if (Array.isArray(seeds)) {
            Promise.each(seeds, function (seed) {
                return exec(seed);
            }).then(function () {
                log.success('Executed seed: ' + options.seed, true);
            }).catch(function (e) {
                log.error(e, true);
            });
        }

        // exec single seeds
        else {
            exec(seeds).then(function () {
                log.success('Executed seed: ' + options.seed, true);
            }).catch(function (e) {
                log.error(e, true);
            });
        }
    };

    // Bootstrap application
    Bootstrap(process.cwd(), runInApplication);
};

/**
 * Valid seed
 *
 * @param seedPath
 * @returns Boolean
 */
function existSeed(seedPath) {
    return (fs.existsSync(seedPath));
}

/**
 * Load seed
 *
 * @param pathApp
 * @param seed
 * @returns {*}
 */
function loadSeed(pathApp, seed) {
    // Extension .js
    seed = (seed.endsWith('.js')) ? seed : seed + '.js';

    var seedPath = path.join(pathApp, seed);

    if (!existSeed(seedPath)) {
        log.error('\r\nSeed not exist... Path:' + seedPath, true);
    }

    return require(seedPath);
}

/**
 * Loop document seed.
 *
 * Example:
 *   this.loop(10, function () {
 *       return {
 *           _id: newUser.newObjectId(),
 *           username: faker.name.findName(),
 *           email: faker.internet.email(),
 *           password: newUser.generateHash(faker.internet.password())
 *       };
 *   });
 *
 * @param loop
 * @param content
 * @returns {Array}
 */
function loop(loop, content) {
    var seed = [];
    for (var i = 0; i < loop; i++) {
        seed.push(
            (typeof content === 'function') ? content() : content
        );
    }
    return seed;
}

/**
 * Execute seed.
 *
 * Parameters
 *    document {Object}
 *        data {Function}
 *        [loop] {Number} Optional
 *    model {Model}
 *
 */
function exec(seed, callback) {
    var document = seed.document,
        model = seed.model;

    document.loop = document.loop || 1;

    return Promise.props(
        loop(document.loop, document.data)
    ).then(function (docs) {

        docs = Object.keys(docs).map(
            function (i) {
                return docs[i]
            }
        );

        return model.create(docs);
    }).asCallback(callback);
}

module.exports = Seeder;
