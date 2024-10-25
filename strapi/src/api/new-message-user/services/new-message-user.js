'use strict';

/**
 * new-message-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-message-user.new-message-user');
