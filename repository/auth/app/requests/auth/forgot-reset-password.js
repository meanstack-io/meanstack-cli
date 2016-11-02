'use strict';

var validator = require('meanstack/lib/validation');

var forgotResetPassword = function () {

    /**
     * Status Code return.
     *   Default: 403
     *
     * @type {number}
     */
    // this.code = 403;

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
     */
    this.rules = {
        password: 'required|min:6',
        repassword: 'required|min:6|equal:password'
    };

    /**
     * Labels of attributes. [Optional]
     *
     * @type {{email: string, password: string}}
     */
    this.labels = {
        password: 'password',
        repassword: 'confirm password'
    };
};

module.exports = validator(forgotResetPassword);
