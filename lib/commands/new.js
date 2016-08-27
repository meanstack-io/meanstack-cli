/**
 * New application.
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var shell = require('shelljs'),
    util = require('util'),
    log = require('../support/log'),
    verifyApplication = require('../support/verifyApplicationTests'),
    path = require('path');

/**
 * Create new application MEANStack
 *
 * @param name
 * @param options
 */
var createNewApplication = function (name, options) {
    if (!validDirectory(name)) {
        log.error('Application already exists!!!', true);
    }

    log.success('Crafting application...');

    cloneApplication(name, options, function () {
            prepareApplication(name, options,
                function () {
                    log.success('Application ready! ', true);
                }
            );
        }
    );
};

/**
 * Valid directory
 *
 * @param name
 * @returns {boolean}
 */
function validDirectory(name) {
    var appPath = path.resolve(process.cwd(), name);

    return !(verifyApplication.bootstrapFile(appPath) || verifyApplication.packageExist(appPath) || verifyApplication.dependencyMEANstack(appPath));
}

/**
 * Prepare application
 *
 * @param name
 * @param options
 * @param done
 */
function prepareApplication(name, options, done) {
    var source = [
        util.format('cd %s', name),
        'rm -rf .git/',
        'npm install',
        'bower install',
        'cp .env.example.js .env.js',
        'gulp'
    ];

    log.success('Preparing application...');

    // Running installation.
    shell.exec(source.join(' && '), function (error) {
        if (error) {
            log.error(error, true);
        }

        log.success('Installed dependencies');

        if (typeof done === "function") {
            done();
        }
    });
}

/**
 * Clone application
 *
 * @param name
 * @param options
 * @param done
 */
function cloneApplication(name, options, done) {
    if ((options.verifyDependencies === true || options.verifyDependencies === 'true') && !verifyDependencies()) {
        return log.error('Error installation.', true);
    }

    var version = options.version ? util.format('-b %s ', options.version) : '';
    var cloningWith = options.git ? 'git@' : 'https://';
    var source = util.format('git clone %s%s%s %s', version, cloningWith, 'github.com/meanstack-io/meanstack.io.git', name);

    log.success('Cloning MEANStack.io ' + source);

    // Running clone
    shell.exec(source, function (error) {
        if (error) {
            log.error(error, true);
        }

        log.success('Cloned MEANStack.io');

        if (typeof done === "function") {
            done();
        }
    });
}

/**
 * Verify dependencies
 *
 * @returns {boolean}
 */
function verifyDependencies() {
    var success = true;

    if (!shell.which('git')) {
        success = log.error('Prerequisite not installed: Git');
    }

    if (!shell.which('node')) {
        success = log.error('Prerequisite not installed: Node.js');
    }

    if (!shell.which('npm')) {
        success = log.error('Prerequisite not installed: NPM');
    }

    if (!shell.which('gulp')) {
        success = log.error('Prerequisite not installed: Gulp');
    }

    if (!shell.which('bower')) {
        success = log.error('Prerequisite not installed: Bower');
    }

    if (!shell.which('nodemon')) {
        success = log.error('Prerequisite not installed: Nodemon');
    }

    return success;
}

module.exports = createNewApplication;
