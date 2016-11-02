'use strict';

var database = require("meanstack").database,
    Schema = database.Schema,
    uniqueTypes = require('meanstack/lib/mongoose/unique'),
    hash = require('meanstack/lib/mongoose/hash'),
    email = require('meanstack/lib/mongoose/validator').email,

    /**
     * Schema User.
     *
     * @type {*|Schema}
     */
    UserSchema = new Schema(
        {
            username: {
                type: String,
                trim: true,
                minlength: [3, 'Username accept min 3 characters !'],
                maxlength: [25, 'Username accept max 25 characters !'],
                required: [true, 'Username is required']
            },
            email: {
                type: String,
                trim: true,
                unique: true,
                uniqueCaseInsensitive: true,
                email: 'Email invalid !',
                required: [true, 'Email is required'],
                index: true
            },
            /**
             * Hash Rounds
             *    https://www.npmjs.com/package/bcrypt#a-note-on-rounds
             */
            password: {
                type: String,
                minlength: [6, 'Password accept min 6 characters !'],
                required: [true, 'Password is required'],
                hash: 11
            },
            forgot: {
                token: {
                    type: String
                },
                expires_at: {
                    type: Date
                }
            }
        }
    );

/**
 * Generating a hash and checking hash.
 *
 * Hash Rounds
 *    https://www.npmjs.com/package/bcrypt#a-note-on-rounds
 *
 * Example Schema:
 *   password: {
 *       type: String,
 *       minlength: [6, 'Password accept min 6 characters !'],
 *       hash: 11
 *   }
 *
 * Method created:
 *   model.compareHash('password', 'compare'); // return true of false
 *
 * @param hash
 */
UserSchema.plugin(hash);

/**
 * Add validator email.
 * Example:
 * ...
 *   email: {
 *       type: String,
 *       trim: true,
 *       unique: true,
 *       email: 'Email invalid !',
 *       ...
 *
 * Parameters
 *   email: {
 *       email: {Boolean|String}
 *       ...
 *
 * Default message: 'Field {PATH} {VALUE} not valid !'
 *
 * @param email
 */
UserSchema.plugin(email);

/**
 * Unique types.
 *
 * Documentation:
 *   https://github.com/blakehaswell/mongoose-unique-validator
 *
 * Custom Error Messages
 *   UserSchema.plugin(uniqueTypes, { message: 'Error, expected {PATH} to be unique.' });
 */
UserSchema.plugin(uniqueTypes);

/**
 * Create model User.
 */
var User = database.model("users", UserSchema);

/**
 * Export model User.
 */
module.exports = User;
