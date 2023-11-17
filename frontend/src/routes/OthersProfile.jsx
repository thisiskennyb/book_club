import { useParams } from 'react-router-dom';

export default function OthersProfile(){
    const { username } = useParams();
    return(<>
    {username}
    </>)

}