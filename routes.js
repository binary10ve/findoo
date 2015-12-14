var controllers = require('./controllers');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    config: controllers.users.create
  },
  {
    method: 'POST',
    path: '/login',
    config: controllers.users.login
  },
  {
    method: 'POST',
    path: '/forgotPassword',
    config: controllers.users.forgotPassword
  },
  {
    method: 'POST', //TODO - revert it back to post once done
    path: '/verifyEmail',
    config: controllers.users.verifyEmail
  },
  {
    method: 'POST',
    path: '/resendVerificationEmail',
    config: controllers.users.resendVerificationEmail
  },
  {
    method: 'GET',
    path: '/salute/{name}',
    config: controllers.users.salute
  }
];
