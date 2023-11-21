// TopFiveList.js

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const BookItem = ({ book, index, moveBook, deleteBook }) => {
  const [, drag] = useDrag({
    item: { type: 'BOOK', index },
  });

  const [, drop] = useDrop({
    accept: 'BOOK',
    hover: (item) => {
      if (item.index !== index) {
        moveBook(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '4px' }}>
      {book.title}
      <button onClick={() => deleteBook(index)}>Delete</button>
    </div>
  );
};

const TopFiveList = ({ topFive, onMoveBook, onDeleteBook }) => {
  return (
    <div>
      {topFive.map((book, index) => (
        <BookItem key={book.id} book={book} index={index} moveBook={onMoveBook} deleteBook={onDeleteBook} />
      ))}
    </div>
  );
};

export default TopFiveList;
