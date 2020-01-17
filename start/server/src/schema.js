const { gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, './schema.graphql'), { encoding: 'utf8' }));

module.exports = typeDefs;
