// require in jquery
const $ = require("jquery");

const setupViewerDom = () => {
  const parentElement = $('#conspectioViewerContainer');

  // setup the eventName DOM element and populate with url query value
  const eventName = $('<h1></h1>').attr(
    {
      'id': 'eventName'
    }
  );

  parentElement.append(eventName);

  const eventTag = window.location.search.substring(5);
  $('#eventName').html(eventTag);

  const videosDiv = $('<div></div>').attr(
    {
      'id': 'videosDiv'
    }
  );

  parentElement.append(videosDiv);

  return eventTag;
};

module.exports = setupViewerDom;