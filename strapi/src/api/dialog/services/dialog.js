'use strict';

/**
 * dialog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dialog.dialog');
