#!/usr/bin/env node

/**
 * MEANStack Client
 *
 * @author: Rafael Pegorari <rafapegorari@gmail.com>
 * @copyright Copyright (c) 2015-2016, MEANStack.io.
 * @license See License
 */

'use strict';

/**
 * Module dependencies.
 */
var program = require('commander'),
    packageInfo = require('../package.json'),
    argv = process.argv;

program
    .version('MEANStack Client, version ' + packageInfo.version, '-v, --version');

program
    .command('new <path_app>')
    .option('-d, --verifyDependencies <verifyDependencies>', 'Verify dependencies.', true)
    .option('-g, --git', 'Use Git, SVN will be used by default with web URL.')
    .option('-v, --version <version>', 'Specify the version. "MASTER" by default will be used.', 'master')
    .description('Create a new MEANStack application')
    .action(require('../lib/commands/new'));

program
    .command('serve')
    .option('-i, --index <index>', 'File index for start application', 'index')
    .option('-e, --nodeEnv <nodeEnv>', 'Environment mode.', 'development')
    .option('-p, --port <port>', 'Environment variable PORT.')
    .option('-d, --debug <debug>', 'Use the debug module for log information about application.')
    .option('-n, --nodemon', 'Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.', true)
    .description('Run application MEANStack')
    .action(require('../lib/commands/run'));

program
    .command('db:seed')
    .description('Run seeder')
    .option('-s, --seed <seed>', 'Use the specified seed. Used by default seed index.', 'index')
    .action(require('../lib/commands/database/seeder'));

program
    .command('db:reset')
    .option('-i, --ignoreModels <ignoreModels>', 'Ignore models.')
    .description('Reset database MongoDB.')
    .action(require('../lib/commands/database/reset'));

program
    .command('make:controller <controller>')
    .option('-r, --resource', 'Create RESTful controller.')
    .option('-m, --model <model>', 'Include model.')
    .description('Make controller.')
    .action(require('../lib/commands/make/controller'));

program
    .command('make:model <model>')
    .description('Make model.')
    .option('-p, --pluralization <pluralization>', 'Pluralize collection name.', true)
    .action(require('../lib/commands/make/model'));

program
    .command('make:request <request>')
    .description('Make request.')
    .action(require('../lib/commands/make/request'));

program
    .command('make:seed <seed>')
    .option('-m, --model <model>', 'Model.')
    .description('Make seed.')
    .action(require('../lib/commands/make/seed'));

// Show help on unknown commands
program.on('*', function () {
    program.help();
});

// If no command specified
if (program.parse(argv).args.length === 0) {
    // display help
    program.help();
}
