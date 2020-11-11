import React from 'react';
import { useQuery } from '@apollo/client';
import { getAuthorQuery } from '../queries/queries';
function BookDetails(props) {
  const { loading, error, data } = useQuery(getAuthorQuery, {
    variables: { id: props.bookid },
    refetchQueries: [{ query: getAuthorQuery }],
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
            {data.author.name}
          </p>
          <p className='age'>
            <b>Age: </b>
            {data.author.age}
          </p>
        </div>
        <div>
          <p>
            <b>All books by the Author</b>
          </p>

          <ul className='allBooks-wrapper'>
            {data.author.books.length > 0 &&
              data.author.books.map((book, index) => (
                <li className={props.bookid} key={index}>
                  {book.name}
                </li>
              ))}
            {data.author.books.length === 0 && <li>No required Found!</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
