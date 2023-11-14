import React, { useEffect, useState } from "react"


export default function Profile() {
    const [profileInfo, setProfileInfo] = useState('')

    const profilePage = async () => {
        const payload = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
          },}
          let url=`http://localhost:8000/api/book-list`
          const apiData = await fetch(url,payload);
          const apiJSON = await apiData.json();
          setProfileInfo(apiJSON)
            return apiJSON
        } 

        const handleDelete = async (completedBookId) => {
            const payload = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
            }

            let url=`http://localhost:8000/api/book-list/completed/${completedBookId}/`
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

    return(<>
        <div>This is profile</div>
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
                <button onClick={() => handleDelete(book["book"]["id"])}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        <div className="profileBorders">
            tbr
        {profileInfo['tbr'].map((book,index)=><p key={index}>{book['book']['title']}</p>)}
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