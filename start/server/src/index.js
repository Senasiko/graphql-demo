const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { dataSources } = require('./datasources')

const pubSub = new PubSub();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources,
  subscriptions: {
    path: '/subscriptions',
    onConnect() {
      return {
        pubSub: new PubSub()
      }
    }
  },
  context: ({ req, res, connection }) => {
    if (connection) {
      // check connection for metadata
      return {
        ...connection.context,
        pubSub,
      };
    } else {
      const token = req.cookies && req.cookies.token || '';
      const user = dataSources().userApi.findUserByToken(token);
      return { currentUser: user, req, res, pubSub };
    }
  },
});

// server.applyMiddleware({ app, path: '/', cors: {
//   origin: 'http://localhost:8082',
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
// }})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscription ready at ${subscriptionsUrl}`);
  });
