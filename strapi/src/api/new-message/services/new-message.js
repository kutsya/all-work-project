'use strict';

/**
 * new-message service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-message.new-message');
