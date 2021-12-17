const { findByUsername } = require('../auth/auth-model');

const checkUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const existing = await findByUsername(username);
    if (existing) {
      next({ status: 401, message: 'username taken' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validatePost = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({ status: 401, message: 'username and password required' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateLogin = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await findByUsername(username);
    if (!user) {
      next({ status: 401, message: 'invalid credentials' });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUsernameExists,
  validatePost,
  validateLogin,
};
