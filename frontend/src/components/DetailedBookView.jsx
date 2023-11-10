import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { saveToList } from "../api/backend_calls";
import { useEffect, useState } from 'react';
import { fetchDetailedBook } from '../api/backend_calls';
import BasicRating from './Rating';

export default function DetailedBookView({open, setOpen, bookInfo}){

    const [saveResponse, setSaveResponse] = useState({result:null})
    const [bookDetails, setBookDetails] = useState(false)
    const [isRatingsOpen, setIsRatingsOpen] = useState(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #FFFF',
        boxShadow: 24,
        p: 4,
      };

    const handleClose = () => {
        setOpen(false)
        // clears it out so you dont get old popup info
        setBookDetails(false)
        setSaveResponse({result:null})
        setIsRatingsOpen(false)
    };

    const handleSave = async (list, context) => {
        const info = {"book":context}
        const response = await saveToList(info, list)
        setSaveResponse(response)
        if(list==="completed"){
            setIsRatingsOpen(true)
            console.log(saveResponse)
        }
      };

    const getDescription = async () =>{
        if(open){
        const apiJSON = await fetchDetailedBook(bookInfo.open_library_id)   
        setBookDetails(apiJSON)
    }}

 

    useEffect(() => {
        getDescription()
    }, [open]);


    return (<>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}> 
            {/* checking for book details makes everything pop at the same time */}
            {bookDetails?(<>
                <h2>{bookInfo.title}</h2>
                <h4>{bookInfo.author}</h4>
                {/* description */}
                <p>
                    {/* checks for description */}
                    {bookDetails.description ? 
                    // some results are in value some are not, checks if value exists
                    bookDetails.description.value ? 
                    // if there is a value it prints it
                    bookDetails.description.value : 
                    // if there was a description but no value prints description
                    bookDetails.description:
                    // if there was no description
                    "no description available"}
                </p>
                <p>
                    {saveResponse.result}
                </p>
                <div>
                    {isRatingsOpen?(<>
                    <BasicRating book_pk={saveResponse.pk}/>
                    </>) :null}
                </div>
                <div className='detailedBookButtons'>
                    <button onClick={() => handleSave("to-be-read", bookInfo)}>to-be-read</button>
                    <button onClick={() => handleSave("completed", bookInfo)}>completed</button>
                    <button onClick={handleClose}>close</button>
                </div>
        {/* what displays until book loads */}
        </>):(<div id="loading"><CircularProgress/>
        Loading Book Info</div>)}
            </Box>
        </Modal>
    
    </>)
}