import { useState, useEffect } from "react"
import { createBookClub, profilePage, getAllBookClubs } from "../api/backend_calls"


export default function CreateBookClubComponent({toggleCreatingBookClub}){
    const [profileInfo, setProfileInfo] = useState(false);
    const [selectedOption, setSelectedOption] = useState('completed_books')
    const [bookPk, setBookPk] = useState(false)
    const [bookClubName, setBookClubName] = useState('')
    
    const handleCreateBookClub = ()=>{
        createBookClub(bookPk, bookClubName)
        toggleCreatingBookClub()
       
      }
      const handleOptionChange = (e) => {
        setSelectedOption(e.target.value); 
      };
      const handleSelectChange = (e) => {
        setBookPk(e.target.value); 
      };
      const handleBookClubNameChange = (e) =>{
        setBookClubName(e.target.value)
      }
      useEffect(() => {
          const fetchProfileInfo = async () => {
              const profile = await profilePage();
              setProfileInfo(profile);
             
          };
    
          fetchProfileInfo();
      }, []);

    return(<>
         <h3>create a book club</h3>
      <p>from list
        <label>
          <input type="radio" 
          name="clubStatus" 
          value="completed_books" 
          checked={selectedOption === 'completed_books'} 
          onChange={handleOptionChange}/>
          Completed
        </label>
        <label>
          <input type="radio" 
          name="clubStatus" 
          value="tbr" 
          checked={selectedOption === 'tbr'} 
          onChange={handleOptionChange}/>
          TBR
        </label>
        </p>
        <label>
        book: 
        <select onChange={handleSelectChange}>
        <option value="" >- Select a book -</option>
        {profileInfo && profileInfo[selectedOption].map((book,index)=>(
          <option value={book.book.id} key={index}>{book['book']['title']}</option>
          ))}
        </select>
          </label>
          <br />
        <label>book club name
          <input onChange={handleBookClubNameChange}/>
        </label>
      <button onClick={()=>{handleCreateBookClub()}}>create club</button>
      <button onClick={()=>console.log(bookClubName)}>print</button>
    </>)
}