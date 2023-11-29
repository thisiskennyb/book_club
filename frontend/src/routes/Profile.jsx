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
          console.log(book.book.pages)
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
    console.log("balls")
    const recommendBook = await toggleRecommend(bookID)
    setJankyToggle(!jankyToggle)
  }

  useEffect(() => {
    const fetchPagesRead = async () => {
      try {
        // If userPK is available, use it for fetching a specific user's pages
        const pagesRead = await getPagesCompleted();
        setTotalPages(pagesRead.pages_completed);
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
      <>
        <DetailedBookView open={open} setOpen={setOpen}  buttons={false} onClose={() => setOpen(false)} bookInfo={clickedBook}/>

          {selectedBook &&<ChangeRating handleClose={handleClose} open={open} book_pk={selectedBook} setOpen={setOpen}/>}
          <div className="profileTitle">Welcome to your Profile</div>
          {/* {totalPages ? (<div>Total Pages{totalPages.pages_completed}</div>) : (<div></div>)} */}
          <div className="headerContainer">
            <div className="totalPages">Total Pages Read: <br /> {totalPages !== null ? totalPages : 'Loading...'}</div>

            <div className="recommended">
                Recommended
            {profileInfo && profileInfo['recommended'].map((book,index)=><p key={index}>{book['book']['title']}</p>)}
            </div>
          </div>

          {typeof profileInfo == "object" ?(
          <div className="bottomContainer">
            <div className="completed">
                Completed
              {profileInfo["completed_books"].map((book, index) => (
                  <div className="book-info-container" key={index}>
                    <div onClick={() => handleOpen(book.book)}>
                    {/* setOpen={setOpen} onClose={() => setOpen(false)} */}
                      {/* book list pk: {book["id"]}  */}
                      Title: {book["book"]["title"]} 
                      <br></br>
                      {/* Rating:{" "} */}
                    </div>
                    <span className="feature">
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
                ))}
              </div>

            <div className="tbr">
                To-Be-Read
            {profileInfo['tbr'].map((book,index)=> (
            <div key={index}>  
              <p> title: {book['book']['title']}</p>
              <span className="feature">
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
              ))}
            </div>

        
          </div>
          ):null}
          {/* <button onClick={()=>{console.log(profileInfo.completed_books)}}>print</button> */}
      </>
    )
    
}