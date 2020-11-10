import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

function AddBook() {
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function submitForm(e) {
    e.preventDefault();
    // console.log(bookName + genre + authorId);
    addBook({
      variables: { bookName: bookName, genre: genre, authorId: authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setBookName('');
    setGenre('');
    setAuthorId('');
  }

  return (
    <form id='add-book' onSubmit={submitForm} className='addBookForm'>
      <div className='form-field'>
        <label for='book-name'>Book Name:</label>
        <input
          type='text'
          name='book-name'
          autocomplete='off'
          required
          onChange={(e) => {
            setBookName(e.target.value);
          }}
        />
      </div>
      <div className='form-field'>
        <label for='genre'>Genre:</label>
        <input
          type='text'
          name='genre'
          autocomplete='off'
          required
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
      </div>
      <div className='form-field'>
        <label>Select Author:</label>
        <select
          onChange={(e) => {
            setAuthorId(e.target.value);
          }}
        >
          <option disabled selected>
            Select Author
          </option>
          {data.authors.map((author, index) => (
            <option key={index} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div className='submitBtn-wrapper'>
        <button type='submit' className='submit-btn'>
          Add Book
        </button>
      </div>
    </form>
  );
}

export default AddBook;
