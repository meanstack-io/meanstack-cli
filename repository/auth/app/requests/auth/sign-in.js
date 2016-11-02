'use strict';

var validator = require('meanstack/lib/validation');

var signIn = function () {

    /**
     * Status Code return.
     *   Default: 403
     *
     * @type {number}
     */
    this.code = 401;

    /**
     * Authorized access. [Optional]
     *   Default true.
     *
     * @param req
     * @returns {boolean}
     */
    // this.authorized = function (req) {
    //     return req.isUnauthenticated();
    // };

    /**
     * Rules. [Required]
     *
     * @type {{email: string, password: string}}
     */
    this.rules = {
        email: 'required|email',
        password: 'required|min:6'
    };

    /**
     * Labels of attributes. [Optional]
     *
     * @type {{email: string, password: string}}
     */
    this.labels = {
        email: 'email',
        password: 'password'
    };

    /**
     * Messages. [Optional]
     *
     * @type {string}
     */
    this.message.required = 'Please :attribute is required !';

    /**
     * Custom message for field. [Optional]
     *
     * @type {string}
     */
    this.fieldMessage.email = {
        email: 'Email :value invalid !!!'
    }
};

module.exports = validator(signIn);
