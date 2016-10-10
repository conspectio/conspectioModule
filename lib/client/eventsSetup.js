const $ = require("jquery");

const eventsSetup = () => {
  conspectio.socket.emit('getEventList');

  conspectio.socket.on('sendEventList', (eventList) => {
    console.log('EVENT LIST:', eventList);
    displayEventList(eventList);
  });

  function displayEventList(eventList) {
    console.log('inside displayEventList');
    $('#conspectioEventsContainer').empty();
    $('#conspectioEventsContainer').append('<ul>');
    eventList.forEach((event) => {
      $('#conspectioEventsContainer').append(`<li><a href='viewer.html?tag=${event}'>${event}</a></li>`);
    });
    $('#conspectioEventsContainer').append('</ul>');
  };
};

module.exports = eventsSetup;