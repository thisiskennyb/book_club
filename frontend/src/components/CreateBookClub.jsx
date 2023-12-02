import { useState, useEffect } from "react"
import { createBookClub, profilePage, getAllBookClubs } from "../api/backend_calls"


export default function CreateBookClubComponent({toggleCreatingBookClub}){
    const [profileInfo, setProfileInfo] = useState(false);
    const [selectedOption, setSelectedOption] = useState('completed_books')
    const [bookPk, setBookPk] = useState(false)
    const [bookClubName, setBookClubName] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const handleCreateBookClub = async ()=>{
      if (!bookPk || !bookClubName) {
        setErrorMessage('Please select a book and provide a club name.');
        return;
      }
        const createdClub = await createBookClub(bookPk, bookClubName)
        toggleCreatingBookClub()
        return createdClub
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

    return(<div className="genericBox">

         <h3>Create a Book Club</h3>
      <p className="custom-radio">From List
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
          To-Be-Read
        </label>
        </p>
        <br />
        <div className="custom-select">

        <label>
        Book
        <select onChange={handleSelectChange} required value={bookPk}>
        <option value="" >- Select A Book -</option>
        {profileInfo && profileInfo[selectedOption].map((book,index)=>(
          <option value={book.book.id} key={index}>{book['book']['title']}</option>
          ))}
        </select>
          </label>
          <br />
        <label>Book Club Name
          <input onChange={handleBookClubNameChange} required/>
        </label>
          </div>
          <br />
      <button className="myButton" onClick={()=>{handleCreateBookClub()}}>Create Club</button>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
    )
  }