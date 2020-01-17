const { DataSource } = require('apollo-datasource');

const users = [{
  id: '1',
  name: 'test1',
  password: '123456',
  email: 'test1@test.com',
  phone: '111111',
  token: '111',
}, {
    id: '2',
    name: 'test2',
    password: '123456',
    email: 'test2@test.com',
    phone: '222222',
    token: '222',
  }
]

class UserAPI extends DataSource {
  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  findUser(id) {
    const user = users.find(u => u.id === id)
    if (user) return user
    else return null;
  }
  findUserByToken(token) {
    const user = users.find(u => u.token === token)
    if (user) return user
    else return null;
  }

  login({ name, password }) {
    const user = users.find(u => u.name === name)
    if (user && user.password === password) return this.findUser(user.id);
    return null
  }
}

module.exports = UserAPI;
