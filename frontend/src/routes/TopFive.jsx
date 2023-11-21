// UserProfile.js

import React, { useState } from 'react';
import TopFiveList from '../components/TopFiveTest';

const UserProfile = () => {
    const [topFive, setTopFive] = useState([]); // Your initial top five list

  const moveBook = (fromIndex, toIndex) => {
    // Implement logic to update the order of books in the top five list
    const updatedTopFive = [...topFive];
    const [movedBook] = updatedTopFive.splice(fromIndex, 1);
    updatedTopFive.splice(toIndex, 0, movedBook);
    setTopFive(updatedTopFive);
  };

  const deleteBook = (index) => {
    // Implement logic to delete a book from the top five list
    const updatedTopFive = [...topFive];
    updatedTopFive.splice(index, 1);
    setTopFive(updatedTopFive);
  };

  return (
    <div>
      <h2>Top Five Books</h2>
      <TopFiveList topFive={topFive} onMoveBook={moveBook} onDeleteBook={deleteBook} />
    </div>
  );
};

export default TopFiveList;
