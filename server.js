'use strict';

const config = require('./config/config.js');
const forceHttps = require('hapi-require-https');
const Hapi = require('@hapi/hapi');
const HapiPino = require('hapi-pino');
const statusCodes = require('./status-codes.js');

const security = {
  hsts: {
    maxAge: 42 * 24 * 60 * 60,
    includeSubDomains: true,
  },
  xframe: 'deny',
  xss: 'enabled',
  referrer: 'same-origin',
};

async function createServer () {

  const isProduction = config.get('NODE_ENV') === 'production';

  const server = Hapi.server({
    port: config.get('PORT'),
    routes: { security },
  });

  if (isProduction) {
    await server.register(forceHttps);
  }

  await server.register([
    {
      plugin: HapiPino,
      options: {
        // Filter out Telegraf monitoring pings
        ignoreFunc: (options, request) => {
          return request.headers?.['x-clevercloud-monitoring'] === 'telegraf';
        },
        // Ignore HAProxy TCP health-check connection resets
        ignoredEventTags: { log: ['ECONNRESET'], error: ['ECONNRESET'] },
        logRequestComplete: true,
      },
    },
    statusCodes,
  ]);

  return server;
}

module.exports = { createServer };
