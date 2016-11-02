'use strict';

var validator = require('meanstack/lib/validation');

var signUp = function () {

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
     * @type {{username: string, email: string, password: string, repassword: string}}
     */
    this.rules = {
        username: 'required|min:3|max:25',
        email: 'required|email',
        password: 'required|min:6',
        repassword: 'required|min:6|equal:password'
    };

    /**
     * Labels of attributes. [Optional]
     *
     *
     * @type {{username: string, email: string, password: string, repassword: string}}
     */
    this.labels = {
        username: 'username',
        email: 'email',
        password: 'password',
        repassword: 'confirm password'
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
    this.fieldMessage.email =  {
        email: 'Email :value invalid !!!'
    };
};

module.exports = validator(signUp);
