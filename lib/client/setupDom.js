
// require in jquery
const $ = require("jquery");
const setupGetUserMedia =  require('./setupGetUserMedia');

const setupDom = () => {

  const parentElement = $('#conspectioBroadcasterContainer');

  const broadcasterStream = $('<video></video>').attr(
    {
      'id': 'broadcasterStream',
      'autoplay': true
    }
  );
  
  const videoContainer = $('<div></div>').append(broadcasterStream);
  parentElement.append(videoContainer);

  const errorMsg = $('<div></div>').attr(
    {
      'id': 'errorMsg'
    }
  );

  parentElement.append(errorMsg);

  const eventTag = $('<input></input>').attr(
    {
      'id': 'eventTag',
      'type': 'text',
      'placeholder': 'tag your stream here'
    }
  );

  const startButton = $('<input></input>').attr(
    {
      'id': 'startButton',
      'type': 'submit',
      'value': 'start',
      // 'onclick': 'sendEventTag'
    }
  );
  
  const stopButton = $('<input></input>').attr(
    {
      'id': 'stopButton',
      'type': 'submit',
      'value': 'stop',
      // 'onclick': 'stopStream',
      'disabled': true
    }
  );

  const inputDiv = $('<div></div>');
  inputDiv.append(eventTag);
  inputDiv.append(startButton);
  inputDiv.append(stopButton);

  parentElement.append(inputDiv);

  // setup dom event handlers
  function sendEventTag() {
    
    const eventTag = $('#eventTag').val();

    // store eventTag value to conspectio.broadcasterEventTag
    conspectio.broadcasterEventTag = eventTag;

    if(eventTag.length) {
      $('#startButton').prop('disabled', true);
      $('#stopButton').prop('disabled', false);

      // TODO: possible to further decouple with socket?
      conspectio.socket.emit('sendEventTag', eventTag);

      // invoke setupGetUserMedia
      setupGetUserMedia();

    } else {
      alert('please enter a tag name to start streaming');
    }
  };

  function stopStream() {
    conspectio.broadcasterStream.getTracks()[0].stop();
    $('#startButton').prop('disabled', false);
    $('#stopButton').prop('disabled', true);
    conspectio.socket.emit('removeBroadcaster', conspectio.broadcasterEventTag);
  };

  $('#startButton').on('click', sendEventTag);
  $('#stopButton').on('click', stopStream);
};

module.exports = setupDom;