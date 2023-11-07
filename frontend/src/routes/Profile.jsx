import { useEffect, useState } from "react"
import { profilePage } from "../api/backend_calls";

export default function Profile() {
    const [profileInfo, setProfileInfo] = useState([])
useEffect(() => {
    const profile =profilePage()
    setProfileInfo(profile)
}, []);
console.log(profileInfo)

    return(<>
        <div>This is profile</div>
        {profileInfo.length>0 ?(<>
        <div className="profileBorder">
        {profileInfo['completed_books'].map((book,index)=><p key={index}>{book}</p>)}
        </div>
        <div className="profileBorder">
        {profileInfo['tbr'].map((book,index)=><p key={index}>{book}</p>)}
        </div>
        <div className="profileBorder">
        {profileInfo['top_five'].map((book,index)=><p key={index}>{book}</p>)}
        </div>
        </>):null}
        
    </>
    )
}