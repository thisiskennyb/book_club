import { getAllBookClubs } from "../api/backend_calls"
import {useState, useEffect} from "react"
import { modifyClub, deleteMyClub} from "../api/backend_calls"
import ClubMessageBoard from "./ClubMessageBoard"
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
    console.log(clubInfo)
    useEffect(() => {
        if(clubInfo){
            checkPermissions()}
    }, [clubInfo]);
    return(<>
    {clubInfo && <div>

    <h4>bookClub name:</h4> 
     {clubInfo.result.name}
    
    <br />
    <h4>Book:</h4>
    {clubInfo.result.book.title}
    <br />
    <h4>Author:</h4>
    {clubInfo.result.book.author}
    <br />
    <h4>members:</h4>
    {clubInfo.result.members.map((member, index)=><p key={index}><a href={`othersProfile/${member['id']}`}>{member['username']}</a></p>)}
    <br />
    {clubInfo && clubInfo['member'] ? 
    <button onClick={()=>sendModifyClubRequest("leave")}>leave club</button>
    :
    <button onClick={()=>sendModifyClubRequest("join")}>join club</button>
    }
    {clubInfo&&isOwner?<button onClick={deleteClub}>delete club</button>:null}
    <button onClick={()=>{setBookClubSelected(false)}}>back</button>
    </div>}
    
    <ClubMessageBoard isMember={isMember} myID={myID} isOwner={isOwner} clubPk={bookClubSelected.id} />
    </>)
}