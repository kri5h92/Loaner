const controller = require('../controller/User');

module.exports = (router) => {
  router.route('/users')
    .get(controller.getUsers);

  router.route('/signup')
    .post(controller.postSignup);

  router.route('/login')
    .get(controller.getLogin);
};

