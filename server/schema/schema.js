const graphql = require('graphql');
var _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

var books = [
  { name: 'xyz', id: '1', genre: 'xyz' },
  { name: 'xyz2', id: '2', genre: 'xyz' },
  ,
  { name: 'xy3', id: '3', genre: 'xyz' },
];
var authors = [
  { name: 'a1', id: '1', age: 22 },
  { name: 'a2', id: '2', age: 40 },
  ,
  { name: 'a3', id: '3', age: 50 },
];
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //   code to get data from the DB / other resource
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
