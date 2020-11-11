import React, { useState } from 'react';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
function BookList() {
  const [bookid, setBookId] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function addActiveClass(e, bookid) {
    setBookId(bookid);
    e.target.classList.add('active');
  }
  return (
    <div className='book-list-wrapper'>
      <ul className='book-list'>
        {data.books.map((book, index) => (
          <li key={index}>
            <button
              className='book-tab'
              onClick={(e) => {
                addActiveClass(e, book.id);
              }}
            >
              {book.name}
            </button>
          </li>
        ))}
      </ul>
      <BookDetails bookid={bookid} />
    </div>
  );
}

export default BookList;
