const { ApolloError } = require('apollo-server');
module.exports = {
  async login(_, { name, password }, { dataSources, currentUser, req, res }) {
    if (currentUser) return currentUser
    const user = dataSources.userApi.login({ name, password })
    if (user) {
      return user
    }
    throw new ApolloError('invalid username or password', 403)
  }
}
