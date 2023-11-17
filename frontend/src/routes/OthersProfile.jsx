import { useParams } from 'react-router-dom';
import { profilePage } from '../api/backend_calls';
import { useEffect } from 'react';
export default function OthersProfile(){
    const { username } = useParams();
    
    
    useEffect(() => {
        profilePage()
    }, []);
    return(<>
    {username}
    </>)

}