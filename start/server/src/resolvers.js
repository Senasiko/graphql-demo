const { User } = require('./resolvers/queries/user')
const { Mutation } = require('./resolvers/mutations')
const { withFilter } = require('apollo-server');

module.exports = {
  Query: {
    user(_, { id }, context) {
      return context.dataSources.userApi.findUser(id);
    },
  },
  Mutation,
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        (_, p, { pubSub }) => pubSub.asyncIterator(['message']),
        (payload, variables) => {
          return payload.messageAdded.toUserId === variables.toUserId;
        },
      ),
    }
  },
  User,
}
