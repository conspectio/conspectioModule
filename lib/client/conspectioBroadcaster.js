const send = require('./send.js');

// custom wrapper class over RTCPeerConnection object
class ConspectioBroadcaster {
  constructor(viewerId) {
    this.viewerId = viewerId;
    this.pc;
  }

  getViewerId() {
    console.log('getViewerId', this.viewerId);
    return this.viewerId;
  }

  init() {
    this.pc = new RTCPeerConnection({
      'iceServers': [
        {
          'url': 'stun:stun.l.google.com:19302'
        },
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        }
      ]
    });
    this.pc.viewerId = this.viewerId; // add custom attribute
    this.pc.onicecandidate = this.handleIceCandidate;
    this.pc.addStream(conspectio.broadcasterStream);
    this.pc.oniceconnectionstatechange = this.handleIceConnectionChange;
  }

  handleIceCandidate(event) {
    console.log('handleIceCandidate event: ', event);
    console.log('handleIceCandidate this', this);
    console.log('handleIceCandidate viewerId', this.viewerId);
    if(event.candidate) {
      send(this.viewerId, {
        type: "candidate",
        candidate: event.candidate
      });
    }  
  }

  handleIceConnectionChange() {
    if(this.pc) {
      console.log('inside handleIceCandidateDisconnect', this.pc.iceConnectionState);
      if(this.pc.iceConnectionState === 'disconnected') {
        console.log('inside pc.onIceConnectionState')
        this.pc.close();
        delete conspectio.connections[this.viewerId];
      }
    }
  }

  createOfferWrapper() {
    this.pc.createOffer( (offer) => {
      send(this.viewerId, {
        type: "offer",
        offer: offer
      });
      this.pc.setLocalDescription(new RTCSessionDescription(offer));
    }, (error) => {
      console.log('Error with creating broadcaster offer', error);
    });
  }

  receiveAnswer(answer) {
    this.pc.setRemoteDescription(new RTCSessionDescription(answer));
  }

  addCandidate(candidate) {
    this.pc.addIceCandidate(new RTCIceCandidate(candidate));
  }

  removeStreamWrapper() {
    this.pc.removeStream(globalStream);
    console.log('ConspectioBroadcaster removeStreamWrapper invoked')
  }

  closeWrapper() {
    this.pc.close();
    console.log('ConspectioBroadcaster closeWrapper invoked');
  }
}

module.exports = ConspectioBroadcaster;