import React, { useEffect, useState } from "react"
import { getPagesCompleted, saveToList, profilePage, deleteCompletedBook, tbrDelete, updatePagesCompleted, decreasePagesCompleted, toggleRecommend } from "../api/backend_calls"
import ReadOnlyRating from "../components/readOnlyRating"
import ChangeRating from "../components/ChangeRating"
import RecommendIcon from '@mui/icons-material/Recommend';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DetailedBookView from "../components/DetailedBookView";
import './css/profile.css';
import trashCan from "../assets/trashCan.png"
import { orange } from "@mui/material/colors";


export default function Profile() {
    const [profileInfo, setProfileInfo] = useState('')
    const [totalPages, setTotalPages] = useState(null)
    const [jankyToggle, setJankyToggle] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(false)
    const [clickedBook, setClickedBook] = useState({})
    const [customerName, setCustomerName] = useState(null)
    // const base_url = import.meta.env.VITE_BASE_URL
    const base_url = "http://localhost:8000/api/"
  
  const handleDelete = async (completedBookId, book) => {   
          const deleteBook = await deleteCompletedBook(completedBookId)
          const updatePagesRead = await decreasePagesCompleted({"pages": parseInt(book.book.pages)});
          setJankyToggle(!jankyToggle)
        }

  const handleTBRDelete = async (tbrBookId) => {
          const deleteBook = await tbrDelete(tbrBookId)
          setJankyToggle(!jankyToggle)
        }

  const handleListChange = async (book, bookId) => {
          const updatePagesRead = await updatePagesCompleted({"pages_completed": parseInt(book.book.pages)});
          const moveBook = await saveToList(book, "completed");
          handleCompletedBookClick(moveBook.pk)
          const deleteTheBook = await tbrDelete(bookId)
          setJankyToggle(!jankyToggle)

  }

  

  const handleClose = () =>{
    setOpen(false)
    setSelectedBook(false)
  }

  const handleCompletedBookClick = (book_pk) =>{
      setSelectedBook(book_pk)
      setOpen(true)
  }

  const handleOpen = (book) => {
    
    setClickedBook(book)
    setOpen(true);
  }

  const handleRecommend = async (bookID) => {
    const recommendBook = await toggleRecommend(bookID)
    setJankyToggle(!jankyToggle)
  }

  useEffect(() => {
    const fetchPagesRead = async () => {
      try {
        // If userPK is available, use it for fetching a specific user's pages
        const pagesRead = await getPagesCompleted();
        console.log(pagesRead)
        setTotalPages(pagesRead.pages_completed);
        setCustomerName(pagesRead.username)
      } catch (error) {
        console.error('Error fetching pages read:', error);
      }
    };
  
    fetchPagesRead();
  }, [jankyToggle]);

useEffect(() => {
  const getProfile = async () => {
  const apiJSON = await profilePage();
  setProfileInfo(apiJSON)
  return apiJSON
  }

    getProfile()
}, [jankyToggle, open]);


    return(
      <div className="page-container">
        <DetailedBookView open={open} setOpen={setOpen}  buttons={false} onClose={() => setOpen(false)} bookInfo={clickedBook}/>

          {selectedBook &&<ChangeRating handleClose={handleClose} open={open} book_pk={selectedBook} setOpen={setOpen}/>}
          <div className="profileTitle">
          <h2 className="titleText">Welcome to your Profile {customerName}</h2>

          </div>
          {/* {totalPages ? (<div>Total Pages{totalPages.pages_completed}</div>) : (<div></div>)} */}
          <div className="headerContainer">
            <div className="totalPages">
              <h3 className="titleText">Total Pages Read:</h3> <br /> 
                <div className="contentText">
                {totalPages !== null ? totalPages : 'Loading...'}
                </div>
            </div>
            
            <div className="recommended">
                <h3 className="titleText">Recommended</h3>
              {profileInfo && profileInfo['recommended'].length > 0 ? (
                <div className="scrollable-container">
                  <div className="bookList">
                    {profileInfo && profileInfo['recommended'].map((book,index)=> (<p key={index}>{book['book']['title']}</p>
              ))}
                  </div>
                </div>
              ) : (
              <p>No recommend books available</p>
             )}
            </div>
          </div>

          
          {typeof profileInfo == "object" ?(
          <div className="bottomContainer">
            <div className="completed">
                <h3 className="titleText">Completed</h3>
              <div className="contentText">
              {profileInfo["completed_books"].length === 0 ? (
                <h4>You have no completed books</h4>
              ) : (
              profileInfo["completed_books"].map((book, index) => (
                  <div className="book-info-container" key={index}>
                    <div className='comp-book-title' onClick={() => handleOpen(book.book)}>
                    {/* setOpen={setOpen} onClose={() => setOpen(false)} */}
                      {/* book list pk: {book["id"]}  */}
                      Title: {book["book"]["title"]} 
                      <br></br>
                      {/* Rating:{" "} */}
                    </div>
                    <span className="contentText">
                      <button onClick={()=>{handleCompletedBookClick(book["id"]) }}>
                      {/* Rating: {" "}   */}
                      {book["user_rating"] ? <ReadOnlyRating value={book["user_rating"]}/> : "not yet rated"}
                      </button>
                      {" "}
                      <button onClick={() => handleDelete(book["id"], book)}> <img src={trashCan} /> 
                      </button>
                      {" "}
                    {book.recommended ? (
                    <>
                    <ThumbUpIcon onClick={() => handleRecommend(book["id"])}/>
                    </>
                    ):(
                    <>
                    <RecommendIcon onClick={() => handleRecommend(book["id"])}/>
                    
                    </>
                    )}
                    </span>
                    
                  </div>
                ))
                
                )}
                </div>
              </div>

            <div className="tbr">
                <h3 className="titleText">To-Be-Read</h3>
              <div className="contentText">
              {profileInfo['tbr'].length === 0 ? (
                <h4>What books would you like to read next?</h4>
              ) : (
              profileInfo['tbr'].map((book,index)=> (
              <div className='book-info-container' key={index}>  
                <p>Title: {book['book']['title']}</p>
                <span className="contentText">
                  <button onClick={() => handleTBRDelete(book["id"])}>
                    <img src={trashCan} />
                  </button>
                  {" "}
                  <button onClick={() => 
                    handleListChange({"book": {
                          "author": book['book']["author"],
                          "book_cover_id": book['book']["book_cover_id"],
                          "open_library_id": book['book']["open_library_id"],
                          "pages": book['book']["pages"],
                          "title": book['book']["title"]
                    }}, book["id"])}>
                        completed
                    </button>
                  </span>
              </div>
              ))
              )}
              
              </div>
            </div>

        
          </div>
          ):null}
          {/* <button onClick={()=>{console.log(profileInfo.completed_books)}}>print</button> */}
      </div>
    )
    
}