Conspectio is a library that provides the ability to display multiple one-to-many live stream broadcasts all in one view. Conspectio is built with WebRTC and Socket.io.

The beta version is currently available. We welcome and encourage any feedback to make conspectio better for everyone. Thank you!


GET STARTED
Installation is broken up into server-side and client-side:

	Server-Side Implementation:
	1) npm install conspectio
	2) In your server.js file, require in conspectio:
		var conspectio = require('conspectio');
		conspectio(http);
	3) Include this in your server file: 
		app.use(express.static(path.join(`${__dirname}/../node_modules/conspectio`)));

	Client-Side Implementation:
	1) Include this in your html file: <script src='./dist/conspectio.js'></script>
	2) To use any of the methods included in these three objects, invoke the functions first:
		conspectio.broadcasterSetup();
		conspectio.viewerSetup();
		conspectio.eventsSetup();



Compatibility:

	This version of conspectio has been tested on Google Chrome browsers and Chrome browsers on mobile Androids.