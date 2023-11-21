import React, { useEffect, useState } from "react"
import { getPagesCompleted, saveToList, profilePage, deleteCompletedBook, tbrDelete } from "../api/backend_calls"
import ReadOnlyRating from "../components/readOnlyRating"
import ChangeRating from "../components/ChangeRating"

export default function Profile() {
    const [profileInfo, setProfileInfo] = useState('')
    const [totalPages, setTotalPages] = useState(null)
    const [jankyToggle, setJankyToggle] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(false)
    // const base_url = import.meta.env.VITE_BASE_URL
    const base_url = "http://localhost:8000/api/"
  
  const handleDelete = async (completedBookId) => {   
          const deleteBook = await deleteCompletedBook(completedBookId)
          setJankyToggle(!jankyToggle)
        }

  const handleTBRDelete = async (tbrBookId) => {
          const deleteBook = await tbrDelete(tbrBookId)
          setJankyToggle(!jankyToggle)
        }

  const handleListChange = async (book, bookId) => {
          console.log(book)
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

  useEffect(() => {
    const fetchPagesRead = async () => {
      const totalPagesRead = await getPagesCompleted()
      setTotalPages(totalPagesRead)
    }
    fetchPagesRead()
  }, [])

useEffect(() => {
  const getProfile = async () => {
  const apiJSON = await profilePage();
  setProfileInfo(apiJSON)
  return apiJSON
  }

    getProfile()
}, [jankyToggle, open]);


    return(<>
        {selectedBook &&<ChangeRating handleClose={handleClose} open={open} book_pk={selectedBook} setOpen={setOpen}/>}
        <div>This is profile</div>
        {totalPages ? (<div>Total Pages{totalPages.pages_completed}</div>) : (<div></div>)}
        {typeof profileInfo == "object" ?(<>
        <div className="profileBorders">
            completed

         {profileInfo["completed_books"].map((book, index) => (
              <div>
                <div key={index} onClick={()=>{handleCompletedBookClick(book["id"])}}>
                  book list pk: {book["id"]} title: {book["book"]["title"]} rating:{" "}
                  {book["user_rating"] ? <ReadOnlyRating value={book["user_rating"]}/> : "not yet rated"}
                </div>
                <button onClick={() => handleDelete(book["id"])}>
                  Delete
                </button>
              </div>
            ))}
          </div>

        <div className="profileBorders">
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

        <div className="profileBorders">
            recommended
        {profileInfo['recommended'].map((book,index)=><p key={index}>{book['book']['title']}</p>)}
        </div>
        </>):null}
        <button onClick={()=>{console.log(profileInfo.completed_books)}}>print</button>
    </>
    )
}