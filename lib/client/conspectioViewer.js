// require in jquery
const $ = require("jquery");
const send = require('./send.js');

// custom wrapper class over RTCPeerConnection object
class ConspectioViewer {
  constructor(broadcasterId) {
    this.broadcasterId = broadcasterId;
    this.pc; 
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
 
    this.pc.broadcasterId = this.broadcasterId; // add custom attribute
    this.pc.onicecandidate = this.handleIceCandidate;
    this.pc.onaddstream = this.handleRemoteStreamAdded;
    this.pc.onremovestream = this.handleRemoteStreamRemoved;
    this.pc.oniceconnectionstatechange = this.handleIceConnectionChange;
  }

  handleIceCandidate(event) {
    console.log('handleIceCandidate event: ', event);
    if(event.candidate) {
      send(this.broadcasterId, {
        type: "candidate",
        candidate: event.candidate
      });
    }
  }

  handleRemoteStreamAdded(event) {
    console.log('got a stream from broadcaster');
    // got remote video stream, now let's show it in a video tag
    const video = $('<video class="newVideo"></video>').attr(
      {
        'src': window.URL.createObjectURL(event.stream),
        'autoplay': true,
        'id': this.broadcasterId.slice(2)
      });
    $('#videosDiv').append(video);
  }

  handleRemoteStreamRemoved(event) {
    console.log('broadcaster stream removed');
    //remove stream video tag - don't think this handler is being invoked
    // $('#' + this.broadcasterId).remove();
  }

  handleIceConnectionChange() {
    if(this.pc) {
      console.log('inside handleIceCandidateDisconnect', this.pc.iceConnectionState);
      if(this.pc.iceConnectionState === 'disconnected') {
        console.log('inside pc.onIceConnectionState')
        this.pc.close();
        delete conspectio.connections[this.broadcasterId];
      }
    }
  }

  receiveOffer(offer) {
    this.pc.setRemoteDescription(new RTCSessionDescription(offer));
  }

  createAnswerWrapper() {
    this.pc.createAnswer( (answer) => {
      this.pc.setLocalDescription(new RTCSessionDescription(answer));

      send(this.broadcasterId, {
        type: "answer",
        answer: answer
      });
    }, (error) => {
      console.log('Error with creating viewer offer', error);
    });
  }

  addCandidate(candidate) {
    this.pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
  
  closeWrapper() {
    this.pc.close();
    //remove stream video tag
    $('#' + this.broadcasterId.slice(2)).remove();
    console.log('broadcaster stream removed from closewrapper');
  }
}

module.exports = ConspectioViewer;