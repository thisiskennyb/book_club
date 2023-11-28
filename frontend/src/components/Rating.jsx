
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { setRatings } from '../api/backend_calls';
import { useState } from 'react';

export default function BasicRating({ handleClose, book_pk }) {
  const [isRatingAdded, setIsRatingAdded] = useState(false);

  const handleRatingClick = async (newValue) => {
    try {
      await setRatings(book_pk, newValue);
      setIsRatingAdded(true);
      setTimeout(() => {
        setIsRatingAdded(false);
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {isRatingAdded ? (
        <p>Successfully added to completed list</p>
      ) : (
        <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
        >
          <Typography component="legend">Rate this book?</Typography>
          <Rating
            name="simple-controlled"
            onChange={(event, newValue) => {
              handleRatingClick(newValue);
            }}
          />
        </Box>
      )}
      <button onClick={handleClose}>close</button>
    </>
  );
}