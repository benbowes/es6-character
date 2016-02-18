/*eslint no-console: 0*/
'use strict';

var hapi = require('hapi');
var server = new hapi.Server();

var staticRoutes = [{
	request: '/',
	file: 'index.html'
}, {
	request: '/index.html',
	file: 'index.html'
}];

server.connection({
	host: 'localhost',
	port: 8003
});

server.register(require('inert'), function(err) {
	if (err) {
		throw err;
	}

	// handle static routes
	staticRoutes.map(function(staticRoute) {
		return server.route({
			method: 'GET',
			path: staticRoute.request,
			handler: function(request, reply) {
				reply.file('./public/' + staticRoute.file);
			}
		});
	});

	// handle any static assets residing in public/
	server.route({
		method: 'GET',
		path: '/public/{filename}',
		handler: {
			file: function(request) {
				return './public/' + request.params.filename;
			}
		}
	});

	server.start(function(err) {
		if (err) {
			throw err;
		}
		console.log('Server running at:', server.info.uri);
	});
});
