const ConspectioViewer = require('./conspectioViewer.js');
const send = require('./send.js');

const viewerRTCEndpoint = (eventTag) => {

    // viewer wants to initiate contact with broadcaster
    conspectio.socket.emit('initiateView', eventTag);

    // viewer receives offer or candidate signaling messages
    conspectio.socket.on('signal', (fromId, message) => {
      if(message.type === 'offer') {
        var newPC = new ConspectioViewer(fromId);
        conspectio.connections[fromId] = newPC;
        newPC.init();
        newPC.receiveOffer(message.offer);
        newPC.createAnswerWrapper(); // since this needs to happen after receiveOffer, put as callback into receiveOffer?
      } else if (message.type === 'candidate') {
        var currentPC = conspectio.connections[fromId];
        if (currentPC){
          currentPC.addCandidate(message.candidate);
        }
      }
    });

    //redirect viewer to events page if there are no more broadcasters streaming their event
    conspectio.socket.on('redirectToEvents', (destination) => {
      console.log('redirecting viewer to events page');
      window.location.href = destination;
    });

    //broadcaster left - close connection & remove from connections object
    conspectio.socket.on('broadcasterLeft', (broadcasterId) => {
      var currentPC = conspectio.connections[broadcasterId];
      if (currentPC){
        currentPC.closeWrapper();
        delete conspectio.connections[broadcasterId];
      }
    })
};

module.exports = viewerRTCEndpoint;