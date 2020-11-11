import React, { useState } from 'react';
import AuthorDetails from './AuthorDetails';
import { useQuery } from '@apollo/client';
import { getAuthorsQuery } from '../queries/queries';
function AuthorList() {
  const [authorid, setAuthorId] = useState(null);
  const { loading, error, data } = useQuery(getAuthorsQuery);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div className='author-list-wrapper'>
      <p>All Authors</p>
      <ul className='author-list'>
        {data.authors.map((author, index) => (
          <li key={index}>
            <button
              onClick={(e) => {
                setAuthorId(author.id);
              }}
            >
              {author.name}
            </button>
          </li>
        ))}
      </ul>
      <AuthorDetails bookid={authorid} />
    </div>
  );
}

export default AuthorList;
