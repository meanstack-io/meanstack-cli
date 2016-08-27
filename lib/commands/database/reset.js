/**
 * Database reset
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
    log = require('../../support/log'),
    Promise = require('bluebird'),
    util = require('util');

/**
 * Reset
 *
 * @param options
 * @constructor
 */
var Reset = function (options) {

    /**
     * runInApplication
     *
     * @param App
     */
    var runInApplication = function (App) {

        // exec before connected database.
        App.database.connection.on('open', function () {

            // List collections in database.
            App.database.connection.db.listCollections({}).toArray()
                .then(function (docs) {
                    var collectionsName = docs.map(function (doc) {
                        return doc.name;
                    });

                    return collectionsRemove(
                        collectionsName,
                        getIgnoreCollections(options)
                    );
                })
                .then(function (collections) {
                    if (!collections.length) {
                        return log.error('There is no collections to drop.', true);
                    }

                    // Drop collections
                    return Promise
                        .each(collections, function (collection) {
                            return App.database.connection.db.dropCollection(collection);
                        })
                        .then(function (collectionsRemoved) {

                            // Message success
                            log.success(
                                util.format(
                                    'Collection%s %s removed !!!',
                                    ((collectionsRemoved.length === 1) ? '' : 's'),
                                    collectionsRemoved.join(', ')
                                ),
                                true
                            );
                        })
                })
                .catch(function (err) {
                    return log.error(err, true);
                });
        });
    };

    // Bootstrap application
    Bootstrap(process.cwd(), runInApplication);
};

/**
 * getIgnoreCollections
 *
 * @param options
 * @return {Array}
 */
function getIgnoreCollections(options) {
    var ignore = options.ignoreModels;

    if (!ignore) {
        return [];
    }

    return ignore.split(",").map(function (elm) {
        return elm.trim();
    });
}

/**
 * collectionsRemove
 *
 * @param models
 * @param ignoreModels
 * @return {Array}
 */
function collectionsRemove(models, ignoreModels) {
    if (!ignoreModels.length) {
        return models;
    }

    return models.filter(function (elm) {
        return !(ignoreModels.indexOf(elm) !== -1);
    });
}

module.exports = Reset;
