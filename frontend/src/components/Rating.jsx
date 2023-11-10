
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { setRatings } from '../api/backend_calls';
import { useState } from 'react';
export default function BasicRating({book_pk}) {
  const [value, setValue] = useState(2);

    const handleRatingClick=()=>{
        setRatings(book_pk, value)
    }
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rate this book?</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onClick={()=>{handleRatingClick()}}
      />

    </Box>
  );
}