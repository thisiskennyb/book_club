
import Rating from '@mui/material/Rating';

export default function ReadOnlyRating({value}) {
  return (<>  
    {value==null ? "Not Yet Rated" : (
      <Rating name="read-only" value={value} readOnly />
    )}
        </>
  );
}