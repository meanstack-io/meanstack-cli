'use strict';

var validator = require('meanstack/lib/validation');

var forgotSendMail = function () {

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
    this.authorized = function (req) {
        return req.isUnauthenticated();
    };

    /**
     * Rules. [Required]
     *
     * @type {{email: string}}
     */
    this.rules = {
        email: 'required|email'
    };

    /**
     * Labels of attributes. [Optional]
     *
     * @type {{email: string}}
     */
    this.labels = {
        email: 'email'
    };

    /**
     * Custom message for field. [Optional]
     *
     * @type {string}
     */
    this.fieldMessage.email = {
        email: 'Email :value invalid !!!'
    }
};

module.exports = validator(forgotSendMail);
