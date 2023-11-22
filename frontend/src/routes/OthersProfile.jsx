import { useParams } from 'react-router-dom';
import { profilePage, getMemberClubs, getUserPagesCompleted } from '../api/backend_calls';
import { useEffect, useState } from 'react';
import ReadOnlyRating from '../components/readOnlyRating';

export default function OthersProfile() {
    const [profileInfo, setProfileInfo] = useState(null);
    const [clubInfo, setClubInfo] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    
    const { userPK } = useParams();
    useEffect(() => {
        const fetchProfileInfo = async () => {
            const profile = await profilePage(userPK);
            const clubs = await getMemberClubs(userPK)
            const userData = await getUserPagesCompleted(userPK)
            setProfileInfo(profile);
            setClubInfo(clubs)
            setUserInfo(userData)
            console.log(userData.pages_completed)
            console.log(userData.username)
            // console.log(profile.tbr[0]["book"]["title"]); 
            console.log(clubs.result[0]["book"]["title"])
            console.log(clubs.result[0]["name"])
        };

        fetchProfileInfo();
    }, []);
    console.log(profileInfo)
    return (
        <>
            {userInfo ? (
            <>    
            <p>{userInfo.username}'s profile</p>
            <div>pages completed:{userInfo.pages_completed}</div>
            </>) : (<p>Loading...</p>)}
            <h3>books completed</h3>
            {profileInfo && profileInfo.completed_books.map((book, index) => (
                <p key={index}>{book.book.title} <ReadOnlyRating value={book.user_rating}/></p>
            ))}
            <h3>To Be Read</h3>
            {profileInfo && profileInfo.tbr.map((book, index) => (
                <p key={index}>{book.book.title}</p>
            ))}
            <h3>Clubs</h3> 
            {clubInfo && clubInfo.result.map((club, index) => (
                <p key={index}>{club.name}</p>
            ))}
            {/* {profileInfo && profileInfo.recommended.map((book, index) => (
                <p key={index}>{book.book.title}</p>
            ))}  */}
           
        </>
    );
}
