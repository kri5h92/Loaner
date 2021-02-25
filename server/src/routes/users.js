const controller = require('../controller/User');
const {validateToken} = require('../utils/jwt');

module.exports = (router) => {
  router.route('/users')
    .get(validateToken,controller.getUsers);

  router.route('/user/:id')
    .get(controller.getUser);

  router.route('/signup')
    .post(controller.postSignup);

  router.route('/login')
    .get(controller.getLogin);
};

