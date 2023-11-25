import React, { useEffect, useState } from "react"
import { getPagesCompleted, saveToList, profilePage, deleteCompletedBook, tbrDelete, updatePagesCompleted, decreasePagesCompleted, toggleRecommend } from "../api/backend_calls"
import ReadOnlyRating from "../components/readOnlyRating"
import ChangeRating from "../components/ChangeRating"
import RecommendIcon from '@mui/icons-material/Recommend';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DetailedBookView from "../components/DetailedBookView";
import './css/profile.css';


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
    <div className='container'>
      <DetailedBookView open={open} setOpen={setOpen}  buttons={false} onClose={() => setOpen(false)} bookInfo={clickedBook}/>

        {selectedBook &&<ChangeRating handleClose={handleClose} open={open} book_pk={selectedBook} setOpen={setOpen}/>}
        <div className="profileTitle">Welcome to your Profile</div>
        {/* {totalPages ? (<div>Total Pages{totalPages.pages_completed}</div>) : (<div></div>)} */}
        <div className="totalPages">Total Pages Read: <br /> {totalPages !== null ? totalPages : 'Loading...'}</div>

        <div className="recommended">
            Recommended
        {profileInfo && profileInfo['recommended'].map((book,index)=><p key={index}>{book['book']['title']}</p>)}
        </div>

        {typeof profileInfo == "object" ?(<>
        <div className="completed">
            completed

         {profileInfo["completed_books"].map((book, index) => (
              <div key={index}>
                <div onClick={() => handleOpen(book.book)}>
                {/* setOpen={setOpen} onClose={() => setOpen(false)} */}
                  book list pk: {book["id"]} title: {book["book"]["title"]} rating:{" "}
                  </div>
                  <div onClick={()=>{handleCompletedBookClick(book["id"]) }}>
                  {book["user_rating"] ? <ReadOnlyRating value={book["user_rating"]}/> : "not yet rated"}
                  </div>
                <button onClick={() => handleDelete(book["id"], book)}>
                  Delete
                </button>
                {book.recommended ? (
                <>
                <ThumbUpIcon onClick={() => handleRecommend(book["id"])}/>
                </>
                ):(
                <>
                <RecommendIcon onClick={() => handleRecommend(book["id"])}/>
                </>
                )}
                
                
              </div>
            ))}
          </div>

        <div className="tbr">
            tbr
        {profileInfo['tbr'].map((book,index)=> (
        <div key={index}>  
          <p> title: {book['book']['title']}</p>
          <button onClick={() => handleTBRDelete(book["id"])}>
            Delete
          </button>
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
        </div>
          ))}
        </div>

       
        </>):null}
        {/* <button onClick={()=>{console.log(profileInfo.completed_books)}}>print</button> */}
    </div>
    )
}