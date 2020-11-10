import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';
function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookid },
  });
  //   console.log(data.book);
  if (loading) return 'Loading...';
  //   if (error) return `Error! ${error.message}`;
  if (error) return null;

  return (
    <div>
      <p className={props.bookid}>{data.book.name}</p>
      <p className={props.bookid}>{data.book.author.name}</p>
      {data.book.author.books.map((book, index) => (
        <p className={props.bookid} key={index}>
          {book.name}
        </p>
      ))}
    </div>
  );
}

export default BookDetails;
