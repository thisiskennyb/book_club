import { useEffect, useState } from "react"


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
        {profileInfo['completed_books'].map((book,index)=><p key={index}>{book['book']['title']}</p>)}
        </div>
        <div className="profileBorders">
            tbr
        {profileInfo['tbr'].map((book,index)=><p key={index}>{book['book']['title']}</p>)}
        </div>
        <div className="profileBorders">
            top 5
        {profileInfo['top_five'].map((book,index)=><p key={index}>{book['book']['title']}</p>)}
        </div>
        </>):null}
        
    </>
    )
}