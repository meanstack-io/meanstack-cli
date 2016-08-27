/**
 * Make model
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
 * Model
 *
 * @param modelName
 * @param options
 * @constructor
 */
var Model = function (modelName, options) {

    /**
     * runInApplication
     *
     * @param App
     */
    var runInApplication = function (App) {

        var modelPath = App.config.get('app').models;

        modelExist(modelPath, modelName)
            .then(function () {
                return readModel();
            })
            .then(function (model) {
                return makeModel(model, modelName, options);
            })
            .then(function (modelCompiled) {
                return writeModel(modelCompiled, modelName, modelPath);
            })
            .then(function () {
                log.success(
                    util.format("Model %s successfully created!", modelName),
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
 * modelExist
 *
 * @param modelPath
 * @param modelName
 */
function modelExist(modelPath, modelName) {

    return new Promise(function (resolve) {

        if (fs.existsSync(path.resolve(modelPath, modelName + '.js'))) {
            throw new Error(
                util.format("Model %s already exists.", modelName)
            );
        }

        return resolve(true);
    });
}

/**
 * readModel
 *
 * @return {Promise}
 */
function readModel() {
    var fileModel = 'make-model.txt';

    return fs.readFileAsync(path.resolve(__dirname, '../../../repository/model/', fileModel), 'utf8');
}

/**
 * makeModel
 *
 * @param model
 * @param modelName
 * @param options
 * @return {Promise}
 */
function makeModel(model, modelName, options) {
    var collectionName = toCollectionName(modelName, options);

    return (
        model.replace(/\{\{CollectionName}}/g, collectionName)
    ).replace(/\{\{Model}}/g, modelName);
}

/**
 * writeModel
 *
 * @param model
 * @param modelName
 * @param modelPath
 * @return {Promise}
 */
function writeModel(model, modelName, modelPath) {
    return fs.writeFileAsync(path.resolve(modelPath, modelName + '.js'), model);
}

/**
 * Produces a collection name from model `name`.
 *   Fork https://github.com/Automattic/mongoose/blob/master/lib/utils.js
 *
 * @param name
 * @param options
 * @return {String} a collection name
 */
function toCollectionName(name, options) {
    options = options || {};

    if (options.pluralization === 'false' || options.pluralization === false) {
        return name.toLowerCase();
    }

    return pluralize(name.toLowerCase());
}

/**
 * Pluralize function.
 *
 * @author TJ Holowaychuk (extracted from _ext.js_)
 * @param {String} str to pluralize
 */
function pluralize(str) {
    var found;

    /**
     * Pluralization rules.
     *
     * These rules are applied while processing the argument to `toCollectionName`.
     */
    var rules = [
        [/(m)an$/gi, '$1en'],
        [/(pe)rson$/gi, '$1ople'],
        [/(child)$/gi, '$1ren'],
        [/^(ox)$/gi, '$1en'],
        [/(ax|test)is$/gi, '$1es'],
        [/(octop|vir)us$/gi, '$1i'],
        [/(alias|status)$/gi, '$1es'],
        [/(bu)s$/gi, '$1ses'],
        [/(buffal|tomat|potat)o$/gi, '$1oes'],
        [/([ti])um$/gi, '$1a'],
        [/sis$/gi, 'ses'],
        [/(?:([^f])fe|([lr])f)$/gi, '$1$2ves'],
        [/(hive)$/gi, '$1s'],
        [/([^aeiouy]|qu)y$/gi, '$1ies'],
        [/(x|ch|ss|sh)$/gi, '$1es'],
        [/(matr|vert|ind)ix|ex$/gi, '$1ices'],
        [/([m|l])ouse$/gi, '$1ice'],
        [/(kn|w|l)ife$/gi, '$1ives'],
        [/(quiz)$/gi, '$1zes'],
        [/s$/gi, 's'],
        [/([^a-z])$/, '$1'],
        [/$/gi, 's']
    ];

    /**
     * Uncountable words.
     *
     * These words are applied while processing the argument to `toCollectionName`.
     */
    var uncountables = [
        'advice',
        'energy',
        'excretion',
        'digestion',
        'cooperation',
        'health',
        'justice',
        'labour',
        'machinery',
        'equipment',
        'information',
        'pollution',
        'sewage',
        'paper',
        'money',
        'species',
        'series',
        'rain',
        'rice',
        'fish',
        'sheep',
        'moose',
        'deer',
        'news',
        'expertise',
        'status',
        'media'
    ];

    if (!~uncountables.indexOf(str.toLowerCase())) {
        found = rules.filter(function (rule) {
            return str.match(rule[0]);
        });
        if (found[0]) {
            return str.replace(found[0][0], found[0][1]);
        }
    }

    return str;
}

module.exports = Model;
