module.exports = [
  //set up good to log every kind of event. Change according to your needs.
  {
    register:require('good'),
    options: {
    reporters: [{
        reporter: require('good-console'),
        events: {
            response: '*',
            log: '*'
        }
    }]
    }
  },
  {register: require('hapi-auth-jwt')}
  //require additional plugins here
];
