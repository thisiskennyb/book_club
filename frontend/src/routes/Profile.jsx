import React, { useEffect, useState } from "react"
import { getPagesCompleted, saveToList, profilePage, deleteCompletedBook, tbrDelete } from "../api/backend_calls"


export default function Profile() {
    const [profileInfo, setProfileInfo] = useState('')
    const [totalPages, setTotalPages] = useState(null)
    const [jankyToggle, setJankyToggle] = useState(false)
    // const base_url = import.meta.env.VITE_BASE_URL
    const base_url = "http://localhost:8000/api/"
  
  useEffect(() => {
    const profilePage = async () => {
      const payload = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },}
        let url=`${base_url}book-list`
        const apiData = await fetch(url,payload);
        const apiJSON = await apiData.json();
        setProfileInfo(apiJSON)
          return apiJSON
      } 
profilePage()

  },[jankyToggle])


  useEffect(() => {
    const fetchPagesRead = async () => {
      const totalPagesRead = await getPagesCompleted()
      setTotalPages(totalPagesRead)
    }
    fetchPagesRead()
  }, [])
          
    

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
          const deleteTheBook = await tbrDelete(bookId)
          setJankyToggle(!jankyToggle)

  }



      //   const tbrDelete = async (tbrBookId) => {
      //     const payload = {
      //         method: "DELETE",
      //         headers: {
      //             "Content-Type": "application/json",
      //             "Authorization": `Token ${localStorage.getItem("token")}`
      //         },
      //     }

      //     let url=`${base_url}book-list/to-be-read/${tbrBookId}/`
      //     const response = await fetch(url, payload);
      //     // console.log(bookInfo.open_library_id)

      //     if (response.status === 204) {
      //         console.log("Book deleted")
      //       setJankyToggle(!jankyToggle)
      //     } else {
      //         console.error("Not deleted")
      //     }
      // }
      
useEffect(() => {
    profilePage()
}, []);
// console.log(profileInfo)
// console.log(typeof profileInfo)

// console.log(profileInfo["completed_books"][0]["book"])

    return(<>
        <div>This is profile</div>
        {totalPages ? (<div>Total Pages{totalPages.pages_completed}</div>) : (<div></div>)}
        {typeof profileInfo == "object" ?(<>
        <div className="profileBorders">
            completed
        {/* {profileInfo['completed_books'].map((book,index)=><p key={index}>title: {book['book']['title']} rating:{book['user_rating']?book['user_rating']:"no"}</p>)}
        
        <button onClick={() => handleDelete(book['book']['id'])}>delete</button>
        
        </div> */}
         {profileInfo["completed_books"].map((book, index) => (
              <div key={index}>
                <p>
                  title: {book["book"]["title"]} rating:{" "}
                  {book["user_rating"] ? book["user_rating"] : "no"}
                </p>
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