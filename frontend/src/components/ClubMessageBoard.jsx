import { useState, useEffect } from "react"
import { addClubMessage } from "../api/backend_calls"
import { getBookClubMessageBoard, deleteMessage } from "../api/backend_calls"
export default function ClubMessageBoard({clubPk, myID, isOwner, isMember}){
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
   
    return(
    <div className="genericBox">

    {/* newpost  */}
    {/* only shows if member or owner */}
    {isMember ? (<>
        <div >
            <label className="messagePost">NEW POST: {" "}
            
                <input className="postText" type="text" value={message} onChange={handleInputChange}></input>
                <button className="myButton postButton" onClick={handlePost}>Post</button>
            </label>
        </div>
    </>): null}
    

    {/* display all messages */}
    {allMessages && typeof allMessages === "string" ? (
  <p>{allMessages}</p>
) : (
  allMessages &&
  allMessages.map((message, index) => (
    <div key={index} className="message-container">
      
        <span className="messagePostUsername">{message.user.username}:</span>{" "}
        <span className="message-text">{message.message}</span>
      
      {/* Show delete button if owner or your message */}
      {isOwner || message.user.id === myID ? (
        <button className="myButton" onClick={() => { handleDelete(message.id) }}>Delete</button>
      ) : null}
    </div>
  ))
)}

    
</div>
    )
}