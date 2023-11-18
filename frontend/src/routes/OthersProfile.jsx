import { useParams } from 'react-router-dom';
import { profilePage } from '../api/backend_calls';
import { useEffect, useState } from 'react';

export default function OthersProfile() {
    const [profileInfo, setProfileInfo] = useState(null);
    
    const { userPK } = useParams();
    useEffect(() => {
        const fetchProfileInfo = async () => {
            const profile = await profilePage(userPK);
            setProfileInfo(profile);
            console.log(profile); 
        };

        fetchProfileInfo();
    }, []);

    return (
        <>
            <p>Other profile</p>
            {profileInfo && profileInfo.completed_books.map((book, index) => (
                <p key={index}>{book.book.title}</p>
            ))}
            {profileInfo && profileInfo.tbr.map((book, index) => (
                <p key={index}>{book.book.title}</p>
            ))}
            {profileInfo && profileInfo.recommended.map((book, index) => (
                <p key={index}>{book.book.title}</p>
            ))}
           
        </>
    );
}
