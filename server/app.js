const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const app = express();

// connect to mlab database
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.de4wt.mongodb.net/graphql-books?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log('Listening to Port no 4000');
});
