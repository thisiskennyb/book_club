import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { setRatings } from '../api/backend_calls';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

export default function ChangeRating({ handleClose, book_pk, open, setOpen }) {
  const [isRatingAdded, setIsRatingAdded] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'hsl(90, 1%, 36%)',
    border: '2px solid #FFFF',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    
  };

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
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
      {isRatingAdded ? (
        <p>Successfully changed rating</p>
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
      <button className='myButton' onClick={handleClose}>Close</button>
      </Box>
      </Modal>
    </>
  );
}