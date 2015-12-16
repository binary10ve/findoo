var controllers = require('../controllers');
module.exports = [
  {
    method: 'POST',
    path: '/api/v2/users',
    config: controllers.users.create
  },
  {
    method: 'POST',
    path: '/api/v2/login',
    config: controllers.users.login
  },
  {
    method: 'POST',
    path: '/api/v2/forgotPassword',
    config: controllers.users.forgotPassword
  },
  {
    method: 'POST',
    path: '/api/v2/verifyEmail',
    config: controllers.users.verifyEmail
  },
  {
    method: 'POST',
    path: '/api/v2/resendVerificationEmail',
    config: controllers.users.resendVerificationEmail
  },
  {
    method: 'GET',
    path: '/api/v2/salute/{name}',
    config: controllers.users.salute
  }
];
