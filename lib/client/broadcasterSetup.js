// require in jquery
const $ = require("jquery");
const setupDom = require('./setupDom.js');
const broadcasterRTCEndpoint  = require('./broadcasterRTCEndpoint.js');

const broadcasterSetup = () => {
  // set the conspectio.initiator to true to indicate broadcaster role
  conspectio.initiator = true;

  // reset conspectio.connections
  conspectio.connections = {};

  // invoke setupDom - setup DOM elements on webpage with appropriate click handlers
  setupDom();

  // invoke broadcasterRTCEndpoint - setup appropriate socket events relating to webRTC connection
  broadcasterRTCEndpoint();
};

module.exports = broadcasterSetup;