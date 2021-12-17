const router = require('express').Router();
const {
  checkUsernameExists,
  validateLogin,
  validatePost,
} = require('../middleware/auth-middleware');
const bcrypt = require('bcryptjs');
const { BCRYPT_ROUNDS } = require('../../config');
const Users = require('../auth/auth-model');
const { buildToken } = require('../token-builder');

router.post(
  '/register',
  validatePost,
  checkUsernameExists,
  (req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
    Users.add({ username, password: hash })
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  }
);

router.post('/login', validatePost, validateLogin, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = buildToken(req.user);
    res.status(200).json({
      message: `welcome, ${req.user.username}`,
      token,
    });
  } else {
    next({ status: 401, message: 'Invalid credentials' });
  }
});

module.exports = router;
