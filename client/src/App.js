import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
// Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AuthorList from './components/AuthorList';
// Client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='app'>
        <div className='left-container'>
          <p className='heading'>Quick Links</p>
          <AuthorList />
        </div>
        <div className='middle-container'>
          <h1 className='heading'>Book List</h1>
          <BookList />
        </div>
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
