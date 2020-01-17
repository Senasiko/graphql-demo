const UserApi = require('./user');

module.exports = {
  dataSources: () => ({
    userApi: new UserApi(),
  })
}
