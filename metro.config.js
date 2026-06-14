// metro.config.js – custom Metro server configuration for Expo
// This forces Metro to listen on port 8082, avoiding the default 8081 conflict.
// It works with Expo SDK 56 (as per user rule).
const { getDefaultConfig } = require("@expo/metro-config");

/** @type {Promise<import('metro-config').ConfigT>} */
module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // Override the server port
  config.server = {
    ...config.server,
    port: 8082,
  };
  return config;
})();
