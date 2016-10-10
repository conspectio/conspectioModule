// require in jquery
const $ = require("jquery");

const setupGetUserMedia = () => {

  // retrieve getUserMedia
  navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia);
    
  if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true, audio: false}, handleVideo, videoError);
  }

  function handleVideo(stream) {
    // keep a reference of the broadcasterStream in conspectio object
    conspectio.broadcasterStream = stream;

    // grab the broadcasterStream dom element
    const broadcasterStream = $('#broadcasterStream')[0];
    broadcasterStream.src = window.URL.createObjectURL(stream);
  }

  function videoError(e) {
      // log video error
      console.log('unable to get stream from getUserMedia', e);
  }

};

module.exports = setupGetUserMedia;