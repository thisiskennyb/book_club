import { getAllBookClubs } from "../api/backend_calls"
import {useState, useEffect} from "react"
import { modifyClub, deleteMyClub} from "../api/backend_calls"
import ClubMessageBoard from "./ClubMessageBoard"
import { Link } from 'react-router-dom';
import './css/clubComponent.css'
export default function SelectedBookClub({myID, bookClubSelected, setBookClubSelected}){
    const [clubInfo, setClubInfo] = useState(false)
    const [memberChange, setMemberChange] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const sendModifyClubRequest = async (modification) =>{
        const apiJSON = await modifyClub(bookClubSelected.id, modification)
        setMemberChange(!memberChange)

        return apiJSON
    }

    const deleteClub = async () =>{
        const result = await deleteMyClub(bookClubSelected.id)
        setBookClubSelected(false)
        return result
    }
    const checkPermissions = () =>{
        setIsMember(false)
        setIsOwner(false)
        const equalMyID = (element) => element['id']===myID
        if(clubInfo['result']['user']===myID){
            setIsOwner(true)
            setIsMember(true)
        }
        else if(clubInfo['result']['members'].some(equalMyID)){
            setIsMember(true)
        }
    }
    useEffect(() => {
        const fetchBookClubs = async () => {
            const bookClubEntries = await getAllBookClubs(bookClubSelected.id);
            setClubInfo(bookClubEntries);
            return bookClubEntries
        };

        fetchBookClubs();
    }, [memberChange, isMember, isOwner]);
    useEffect(() => {
        if(clubInfo){
            checkPermissions()}
    }, [clubInfo]);
    return(<>
    {clubInfo && 
    <>
        <div className="genericBox">
            <h4>BOOKCLUB NAME: {clubInfo.result.name}</h4> 
            <h4>BOOK: {clubInfo.result.book.title}</h4>
            <h4>AUTHOR: {clubInfo.result.book.author}</h4>
        </div>
        <div className="genericBox">
            <h4>MEMBERS:</h4>
        </div>
    
        <div id="nameBubbles">
        {clubInfo.result.members.map((member, index)=><p className="nameLinkP" onClick={()=>{setBookClubSelected(false)}} key={index}><Link className="nameLink" to={`/othersProfile/${member['id']}`}>{member['username']}</Link></p>)}
        </div>
 

        <div className="genericBox">
            {clubInfo && clubInfo['member'] ? 
            <button className="myButton" onClick={()=>sendModifyClubRequest("leave")}>Leave Club</button>
            :
            <button className="myButton" onClick={()=>sendModifyClubRequest("join")}>Join Club</button>
        }
            {clubInfo&&isOwner?<button className="myButton" onClick={deleteClub}>Delete Club</button>:null}
            <button className="myButton"  onClick={()=>{setBookClubSelected(false)}}>Back</button>
        </div>

    </>}
    
    <ClubMessageBoard isMember={isMember} myID={myID} isOwner={isOwner} clubPk={bookClubSelected.id} />
    
    </>)
}