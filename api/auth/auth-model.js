const db = require('../../data/dbConfig');

async function add(user) {
  const [id] = await db('users').insert(user);
  return db('users').where('id', id).first();
}

function findByUsername(username) {
  return db('users').where('username', username).first();
}

function findBy(filter) {
  return db('users').where(filter);
}

module.exports = {
  add,
  findByUsername,
  findBy,
};
