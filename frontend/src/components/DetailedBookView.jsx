import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { saveToList } from "../api/backend_calls";
import { useEffect, useState } from 'react';
import { fetchDetailedBook, fetchOtherUsersSameBook, updatePagesCompleted } from '../api/backend_calls';
import BasicRating from './Rating';
import ReadOnlyRating from './readOnlyRating';
import './css/detailedBookView.css'
import { Link } from 'react-router-dom';

export default function DetailedBookView({ open, setOpen, bookInfo, onClose, buttons }) {

  const [saveResponse, setSaveResponse] = useState({ result: null });
  const [bookDetails, setBookDetails] = useState(false);
  const [otherUsersSameBook, setOtherUsersSameBook] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isRatingsOpen, setIsRatingsOpen] = useState(false);
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
  };

  const handleClose = () => {
    setOpen(false);
    setBookDetails(false);
    setSaveResponse({ result: null });
    setOtherUsersSameBook(false);
    setIsAdded(false);
    setIsRatingsOpen(false);
  };

  const handleSave = async (list, context) => {
    const info = { "book": context };
    const response = await saveToList(info, list);
    
    setSaveResponse(response);

    if (list === "to-be-read") {
      setIsAdded(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }

    else if (list === "completed") {
        setIsAdded(true);
        const updatePagesRead = await updatePagesCompleted({"pages_completed": parseInt(context.pages)});
        setIsRatingsOpen(true); // Open ratings only if the list is "completed"
      }
  };

  const getDescription = async () => {
    if (open) {
      const apiJSON = await fetchDetailedBook(bookInfo.open_library_id);
      setBookDetails(apiJSON);
    }
  };

  const getOtherUsers = async () => {
    if (open) {
      const apiJSON = await fetchOtherUsersSameBook(bookInfo.open_library_id);
      setOtherUsersSameBook(apiJSON.other_readers);
    }
  };

  useEffect(() => {
    getDescription();
    getOtherUsers();
  }, [open]);

return (
  <>
  
  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
        <div id="detailedBookPage">
          {bookDetails ? (
            <>
              {isAdded && !isRatingsOpen ? (
                <div>Successfully Added</div>
                ) : (
                  <>
                  {isRatingsOpen ? (
                    
                    <BasicRating handleClose={handleClose} book_pk={saveResponse.pk}/>
                    ) : (
                      <>
                      <h1>{bookInfo.title}</h1>
                      <h4>{bookInfo.author}</h4>
                      <p>
                        {bookDetails.description
                          ? bookDetails.description.value
                          ? bookDetails.description.value
                          : bookDetails.description
                          : "No Description Available"}
                      </p>
                      <div className='detailedBookButtons'>
                        {buttons ? (
                          <>                        
                        <button className="myButton" onClick={() => handleSave("to-be-read", bookInfo)}>To-Be-Read</button>
                        <button className="myButton" onClick={() => handleSave("completed", bookInfo)}>Completed</button>
                        </>
                        ):(
                          <></>
                          )}

                        <button className="myButton" onClick={handleClose}>Close</button>
                      </div>
  
                      {otherUsersSameBook ?
                        typeof otherUsersSameBook === "string" ? (
                          <p>{otherUsersSameBook}</p>
                          ) : (<div className='nameBubbles'>

                          {otherUsersSameBook.map((others, index) => (
                            <Link className='nameLink nameLinkP' to={`/othersProfile/${others.user.pk}`}>{others.user.username} <ReadOnlyRating value={others.user_rating} /></Link>
                            ))}
                        </div>
                        )
                        : null}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <div id="loading"><CircularProgress /> Loading Book Info</div>
            )}
            </div>
        </Box>
      </Modal>
    </>
  );
  
          }

