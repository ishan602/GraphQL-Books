import { gql } from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
      age
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
      authorId
    }
  }
`;

const addBookMutation = gql`
  mutation($bookName: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $bookName, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
const getAuthorQuery = gql`
  query($id: ID!) {
    author(id: $id) {
      id
      name
      age
      books {
        name
        id
      }
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery,
  getAuthorQuery,
};
