import { getAllBookClubs } from "../api/backend_calls"
import {useState, useEffect} from "react"
import { modifyClub, deleteMyClub} from "../api/backend_calls"
import ClubMessageBoard from "./ClubMessageBoard"
import { useNavigate } from "react-router-dom"
export default function SelectedBookClub({myID, bookClubSelected, setBookClubSelected}){
    const navigate = useNavigate();
    const [clubInfo, setClubInfo] = useState(false)
    const [memberChange, setMemberChange] = useState(false)
    
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

    useEffect(() => {
        const fetchBookClubs = async () => {
            const bookClubEntries = await getAllBookClubs(bookClubSelected.id);
            setClubInfo(bookClubEntries);
            return bookClubEntries
        };

        fetchBookClubs();
    }, [memberChange]);
    console.log(clubInfo)
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
    {clubInfo&&clubInfo.result.user===myID?<button onClick={deleteClub}>delete club</button>:null}
    <button onClick={()=>{setBookClubSelected(false)}}>back</button>
    </div>}
    
    <ClubMessageBoard clubPk={bookClubSelected.id} />
    </>)
}