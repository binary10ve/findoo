var Hapi = require('hapi');

var path = require('path');
var settings = require('config');
var Config = require('./config/settings');
var routes = require('./routes');
var plugins = require('./plugins');
var models = require('./models');

var app = {};
app.config = Config;


var privateKey = app.config.key.privateKey;
var ttl = app.config.key.tokenExpiry;
var server = new Hapi.Server({
  connections:{
    routes:{
      cors:Config.cors
    }
  }
});

server.connection({port:Config.server.port, host:Config.server.host});

// Export the server to be required elsewhere.
module.exports = server;

// Validate function to be injected
var validate = function(token, callback) {
    // Check token timestamp
    var diff = Moment().diff(Moment(token.iat * 1000));
    if (diff > ttl) {
        return callback(null, false);
    }
    callback(null, true, token);
};

var setup = function(done){

console.log("In setup")
	//Register all plugins
	server.register(plugins, function (err) {
		if (err) {
			throw err; // something bad happened loading a plugin
		}
	});

  // server.register([{
  //     register: require('hapi-auth-jwt')
  // }], function(err) {
  //   //TODO Dont know why I am doing this.. I will come back to this later
  //   console.log("Errr-", err)
  //     server.auth.strategy('token', 'jwt', {
  //         validateFunc: validate,
  //         key: privateKey
  //     });
  // });
  // Add the server routes
  server.route(routes);

    done();

};

var start = function(){
  server.start(function(){
    server.log('info', 'Server running at: ' + server.info.uri);
  });
};

// If someone runs: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
  setup(function(){
    start();
  });
}
