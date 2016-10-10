'use strict';

const conspectio = {};

// require in webrtc-adapter for shimming
require('webrtc-adapter');

// require in socket.io-client
const io = require('socket.io-client');

// instantiate shared socket
conspectio.socket = io();

conspectio.broadcasterStream = null;
conspectio.broadcasterEventTag = null;
conspectio.initiator = null;
conspectio.connections = {};
// conspectio.webRTCConfig = {};

// import module that handles broadcasterSetup
conspectio.broadcasterSetup = require('./broadcasterSetup');

// import module that handles eventsSetup
conspectio.eventsSetup = require('./eventsSetup');

// import module that handles viewerSetup
conspectio.viewerSetup = require('./viewerSetup');

window.conspectio = conspectio;