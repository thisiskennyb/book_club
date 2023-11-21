import { useState, useEffect } from "react"
import { addClubMessage } from "../api/backend_calls"
import { getBookClubMessageBoard, deleteMessage } from "../api/backend_calls"
export default function ClubMessageBoard({clubPk}){
    const [allMessages, setAllMessages] = useState(false)
    const [message, setMessage] = useState("")
    const [refresh, setRefresh] = useState(false)
    const handlePost = async () =>{
        const apiJSON = await addClubMessage(clubPk, message)
        setMessage("")
        setRefresh(!refresh)
        return apiJSON
    }
    const handleDelete = async (messagePk) =>{
        const apiJSON = await deleteMessage(messagePk)
        setRefresh(!refresh)
        return apiJSON
    }
    const handleInputChange = (e) =>{
        setMessage(e.target.value)
    }
    useEffect(() => {
        const fetchAllMessages = async () => {
            const allClubMessages = await getBookClubMessageBoard(clubPk);
            setAllMessages(allClubMessages.result);
            return allMessages
        };
        fetchAllMessages()
    }, [refresh]);
    
    return(<>
    <label>new post: 
        <input type="text" value={message} onChange={handleInputChange}></input>
    </label>
    <button onClick={handlePost}>post</button>
    {allMessages && typeof allMessages==="string"?<p>{allMessages}</p>:
    allMessages && allMessages.map((message, index)=>(<p key={index}>{message.user.username}: {message.message} <button onClick={()=>{handleDelete(message.id)}}>delete</button></p>))
    }
    
    </>)
}