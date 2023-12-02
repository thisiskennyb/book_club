
import Rating from '@mui/material/Rating';
import './css/detailedBookView.css'
export default function ReadOnlyRating({value}) {
  return (<>  
    {value==null ? <span className='notRatedSpan'>Not Yet Rated </span>: (
      <Rating className='notRatedSpan' name="read-only" value={value} readOnly />
    )}
        </>
  );
}