const graphql = require('graphql');
var _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

var books = [
  { name: 'xyz', id: '1', genre: 'xyz', authorId: '1' },
  { name: 'xyz2', id: '2', genre: 'xyz', authorId: '2' },
  { name: 'xy3', id: '3', genre: 'xyz', authorId: '3' },
  { name: 'xyz4', id: '4', genre: 'xyz', authorId: '1' },
  { name: 'xyz5', id: '5', genre: 'xyz', authorId: '2' },
  { name: 'xyz6', id: '6    ', genre: 'xyz', authorId: '3' },
];
var authors = [
  { name: 'a1', id: '1', age: 22 },
  { name: 'a2', id: '2', age: 40 },
  { name: 'a3', id: '3', age: 50 },
  { name: 'a4', id: '1', age: 22 },
  { name: 'a5', id: '2', age: 40 },
  { name: 'a6', id: '3', age: 50 },
];
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
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
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
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
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
