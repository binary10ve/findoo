var controllers = require('../controllers');
module.exports = [
  {
    method: 'POST',
    path: '/api/v1/users',
    config: controllers.users.create
  },
  {
    method: 'POST',
    path: '/api/v1/login',
    config: controllers.users.login
  },
  {
    method: 'POST',
    path: '/api/v1/forgotPassword',
    config: controllers.users.forgotPassword
  },
  {
    method: 'POST',
    path: '/api/v1/verifyEmail',
    config: controllers.users.verifyEmail
  },
  {
    method: 'POST',
    path: '/api/v1/resendVerificationEmail',
    config: controllers.users.resendVerificationEmail
  },
  {
    method: 'GET',
    path: '/api/v1/salute/{name}',
    config: controllers.users.salute
  }
];
