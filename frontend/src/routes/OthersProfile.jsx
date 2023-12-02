import { useParams } from 'react-router-dom';
import { profilePage, getMemberClubs, getUserPagesCompleted } from '../api/backend_calls';
import { useEffect, useState } from 'react';
import ReadOnlyRating from '../components/readOnlyRating';
import SelectedBookClub from '../components/SelectedBookClub';
import { getAllBookClubs } from '../api/backend_calls';
import './css/othersProfile.css';
export default function OthersProfile() {
    const [profileInfo, setProfileInfo] = useState(null);
    const [clubInfo, setClubInfo] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [myID, setMyId] = useState(false)
    const [clubSelected, setClubSelected] = useState(false)
    const { userPK } = useParams();
   

    const handleClubClick =(club) =>{
        setClubSelected(club)
    }
    useEffect(() => {
       
        const fetchProfileInfo = async () => {
            const profile = await profilePage(userPK);
            const clubs = await getMemberClubs(userPK)
            const userData = await getUserPagesCompleted(userPK)
            const userID = await getAllBookClubs()
            setMyId(userID.myid)
            setProfileInfo(profile);
            setClubInfo(clubs)
            setUserInfo(userData)
        };

        fetchProfileInfo();
    }, [clubSelected]);
    if(clubSelected){
        return <div className='clubPage'>
            <SelectedBookClub myID={myID} bookClubSelected={clubSelected} setBookClubSelected={setClubSelected}/>
            </div>
    }
    else
        return (
            <div className="othersPage">
            {userInfo ? (
                <>    
                <div className="profileTitle">
                    <h2>{userInfo.username}'s profile</h2>
                </div>
                <div className="headerContainer">
                    <div className="totalPages">
                        <h3>Total Pages Read:{userInfo.pages_completed}</h3>
                    </div>
                    <div className="recommended">
                        <h3>Recommended</h3>
                        {profileInfo && profileInfo.recommended.length >0 ? profileInfo.recommended.map((book, index) => (
                        <p key={index}>{book.book.title}</p>
                        )):<p>No recommended books available</p>} 
                    </div>
                </div>
            </>) : (<p>Loading...</p>)}


            
            <div className='bottomContainer'>
       
                <div className="completedAndTbr">
                    <div className='bookListBlock'>
                        <h3>Completed</h3>
                        {profileInfo && profileInfo.completed_books.map((book, index) => (
                            <div className="book-info-container">
                                <div  key={index}>{book.book.title} <ReadOnlyRating value={book.user_rating}/></div>
                            </div>
                        ))}
                    </div>
                    <div className='bookListBlock'>
                        <h3>To Be Read</h3>
                        {profileInfo && profileInfo.tbr.map((book, index) => (
                        <p key={index}>{book.book.title}</p>
                        ))}
                    </div>
                </div>
                <div className='othersClubsBlock'>
                    <h3>Clubs</h3> 
                    {clubInfo && clubInfo.result.map((club, index) => (
                    <div onClick={()=>{handleClubClick(club)}} key={index}>{club.name}</div>
                    ))}
                </div>
            </div>
            
            
            
            

           
        </div>
    );
}
