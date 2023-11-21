import React, { useEffect, useState } from "react"
import { getPagesCompleted, saveToList } from "../api/backend_calls"


export default function Profile() {
    const [profileInfo, setProfileInfo] = useState('')
    const [totalPages, setTotalPages] = useState(null)
    // const base_url = import.meta.env.VITE_BASE_URL
    const base_url = "http://localhost:8000/api/"
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

  useEffect(() => {
    const fetchPagesRead = async () => {
      const totalPagesRead = await getPagesCompleted()
      setTotalPages(totalPagesRead)
    }
    fetchPagesRead()
  }, [])
        
    

        const handleDelete = async (completedBookId) => {
            const payload = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
            }

            let url=`${base_url}book-list/completed/${completedBookId}/`
            const response = await fetch(url, payload);
            // console.log(bookInfo.open_library_id)

            if (response.status === 204) {
                console.log("Book deleted")
            profilePage()
            } else {
                console.error("Not deleted")
            }
        }



        const tbrDelete = async (tbrBookId) => {
          const payload = {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("token")}`
              },
          }

          let url=`${base_url}book-list/to-be-read/${tbrBookId}/`
          const response = await fetch(url, payload);
          // console.log(bookInfo.open_library_id)

          if (response.status === 204) {
              console.log("Book deleted")
          profilePage()
          } else {
              console.error("Not deleted")
          }
      }
      
useEffect(() => {
    profilePage()
}, []);
console.log(profileInfo)
console.log(typeof profileInfo)

console.log(totalPages)

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
          <button onClick={() => tbrDelete(book["id"])}>
            Delete
          </button>
          <button onClick={() => (async () => {
            // const info = { "book": context };
                await tbrDelete(book["id"]); // Replace with your asynchronous function call
                // await saveToList(info, list='completed'); // Replace with your asynchronous function call
            })()}>
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