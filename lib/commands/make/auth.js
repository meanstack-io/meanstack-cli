/**
 * Make Auth
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var verifyApplication = require('../../support/verifyApplication'),
    log = require('../../support/log'),
    path = require('path'),
    FileAppend = require('../../support/FileAppend'),
    mergeDirs = require('../../support/MergeDirs'),
    shell = require('shelljs');

/**
 * Auth
 *
 * @constructor
 */
var Auth = function () {

    // verify if is application MEANStack
    verifyApplication();

    installDependencies(function () {

        addServicesProviders();

        mergeDirs(path.resolve(__dirname, '../../../repository/auth'), process.cwd(), false);

        addDependencyOfStyle();

        addFilesInGulpStrategy();

        addRoutes();

        addNavAndToasterInLayouts();

        addModulesInApplicationAngular();

        addConfigAuthAngular();

        addModuleAuthAngular();
    });
};

function installDependencies(done) {
    var source = [
        'npm update',
        'bower update',
        'npm install passport-local --save',
        'bower install toaster angular-animate angular-sanitize --save'
    ];

    log.success('Installing dependencies....');

    shell.exec(source.join(' && '), function (error) {
        if (error) {
            log.error(error, true);
        }

        log.success('Dependencies installed.');

        if (typeof done === "function") {
            done();
        }
    });
}

function addServicesProviders() {
    var File = new FileAppend('config/app.js');

    if (!File.load()) {
        return false;
    }

    if (!File.index("'meanstack/lib/response/ResponseServiceProvider',")) {
        return false;
    }

    // Add lines
    File.addLine("        // ======== Make:auth ========");
    File.addLine("        'meanstack/lib/mail/MailServiceProvider',");
    File.addLine("        'meanstack/lib/auth/CookieServiceProvider',");
    File.addLine("        'meanstack/lib/passport/PassportServiceProvider',");
    File.addLine("        // ====== END Make:auth ======");

    // Writer file.
    File.close();

    return log.success("config/app.js => added service provider Mail, Auth/Cookie and Passport.");
}

function addDependencyOfStyle() {
    var File = new FileAppend('resources/assets/stylesheets/sass/main.scss');

    if (!File.load()) {
        return false;
    }

    if (!File.index('@import "../../bower/bootstrap-sass/assets/stylesheets/_bootstrap.scss";')) {
        return false;
    }

    // Add lines
    File.addLine("// ======== Make:auth ========");
    File.addLine('@import "../../bower/AngularJS-Toaster/toaster.scss";');
    File.addLine("// ====== END Make:auth ======");

    // Writer file.
    File.close();

    // Writer file.
    return log.success("resources/assets/stylesheets/sass/main.scss => added dependencies in style.");
}

function addFilesInGulpStrategy() {
    var File = new FileAppend('resources/assets/gulp.assets.js');

    if (!File.load()) {
        return false;
    }

    if (!File.index("path.bower + '/oclazyload/dist/ocLazyLoad.js',")) {
        return false;
    }

    // Add lines
    File.addLine("            // ======== Make:auth ========");
    File.addLine("            path.bower + '/angular-animate/angular-animate.js',");
    File.addLine("            path.bower + '/angular-sanitize/angular-sanitize.js',");
    File.addLine("            path.bower + '/AngularJS-Toaster/toaster.js',");
    File.addLine("            // ====== END Make:auth ======");

    if (!File.index("path.meanstack + '/lib/angular/modules/path.js',")) {
        return false;
    }

    // Add lines
    File.addLine("            // ======== Make:auth ========");
    File.addLine("            path.meanstack + '/lib/angular/modules/auth.js',");
    File.addLine("            path.meanstack + '/lib/angular/modules/compile.js',");
    File.addLine("            // ====== END Make:auth ======");

    // Writer file.
    File.close();

    return log.success("resources/assets/gulp.assets.js => added dependencies in Gulp strategy.");
}

function addRoutes() {
    var File = new FileAppend('app/routes.js');

    if (!File.load()) {
        return false;
    }

    if (!File.index('router.use(router.namespace(),')) {
        return false;
    }

    // Add lines
    File.addLine("        // ======== Make:auth ========");
    File.addLine("        Router().useController('/auth', 'auth'),");
    File.addLine("        Router().useController('/dashboard', 'dashboard'),");
    File.addLine("        // ====== END Make:auth ======");

    // Writer file.
    File.close();

    return log.success("app/routes.js => added routes \"/auth\" and \"/dashboard\" ");
}

function addNavAndToasterInLayouts() {
    var File = new FileAppend('resources/views/layouts/app.hbs');

    if (!File.load()) {
        return false;
    }

    if (!File.index('<body>')) {
        return false;
    }

    // Add lines
    File.addLine("");
    File.addLine("<!-- ======== Make:auth ======== -->");
    File.addLine("{{>nav}}");
    File.addLine("{{>toaster}}");
    File.addLine("<!-- ====== END Make:auth ====== -->");
    File.addLine("");

    // Writer file.
    File.close();

    return log.success("resources/views/layouts/app.hbs => added partials. \"nav\" and \"toaster\" ");
}

function addModulesInApplicationAngular() {
    var File = new FileAppend('resources/assets/javascripts/angular/app.js');

    if (!File.load()) {
        return false;
    }

    if (!File.index("angular.module('App', [")) {
        return false;
    }

    // Add lines
    File.addLine("");
    File.addLine("// ======== Make:auth ========");
    File.addLine("'meanstack.auth',");
    File.addLine("'meanstack.compile',");
    File.addLine("'ngAnimate',");
    File.addLine("'ngSanitize',");
    File.addLine("'toaster',");
    File.addLine("// ====== END Make:auth ======");
    File.addLine("");

    // Writer file.
    File.close();

    return log.success("resources/assets/javascripts/angular/app.js => added modules for AngularJS.");
}

function addConfigAuthAngular() {
    var File = new FileAppend('resources/assets/javascripts/angular/config.js');

    if (!File.load()) {
        return false;
    }

    if (!File.index(".constant('config', {")) {
        return false;
    }

    // Add lines
    File.addLine("");
    File.addLine("        // ======== Make:auth ========");
    File.addLine("        auth: {");
    File.addLine("            redirect: {");
    File.addLine("                notLogged: 'signin',");
    File.addLine("                logged: 'dashboard',");
    File.addLine("                paramOfRedirect: true");
    File.addLine("            },");
    File.addLine("            cookie: 'session.auth'");
    File.addLine("        },");
    File.addLine("        // ====== END Make:auth ======");
    File.addLine("");

    // Writer file.
    File.close();

    return log.success("resources/assets/javascripts/angular/config.js => added conf for auth module.");
}

function addModuleAuthAngular() {
    var File = new FileAppend('resources/assets/javascripts/angular/run.js');

    if (!File.load()) {
        return false;
    }

    if (!File.index(".run(['route', function (route) {")) {
        return false;
    }

    // Remove line .run(['route', function (route) {
    File.removeLine();

    // Add lines
    File.addLine("    .run(['route', 'auth', function (route, auth) {");
    File.addLine("        // ======== Make:auth ========");
    File.addLine("        auth.bootstrap();");
    File.addLine("");

    // Writer file.
    File.close();

    return log.success("resources/assets/javascripts/angular/run.js => added auth.bootstrap().");
}

module.exports = Auth;
