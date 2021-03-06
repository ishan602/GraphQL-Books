import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';
function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookid },
    refetchQueries: [{ query: getBookQuery }],
  });
  if (loading) return null;
  if (error) return null;

  return (
    <div className='right-container'>
      <p className='heading'>Author Details</p>
      <div className='author-info'>
        <div>
          <p className='name'>
            <b>Full Name: </b>
            {data.book.author.name}
          </p>
          <p className='age'>
            <b>Age: </b>
            {data.book.author.age}
          </p>
        </div>
        <div>
          <p>
            <b>All books by the Author</b>
          </p>
          <ul className='allBooks-wrapper'>
            {data.book.author.books.map((book, index) => (
              <li className={props.bookid} key={index}>
                {book.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
