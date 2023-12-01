import { useState, useEffect } from "react"
import { createBookClub, profilePage, getAllBookClubs, getAllMyClubs } from "../api/backend_calls"
import CreateBookClubComponent from "../components/CreateBookClub";
import SelectedBookClub from "../components/SelectedBookClub";
import ClubComponent from "../components/ClubComponent";
import './css/bookClub.css'
export default function BookClub({bookClubSelected, setBookClubSelected}) {
  const [bookClubs, setBookClubs] = useState(false)
  
  const [creatingBookClub, setCreatingBookClub] = useState(false)
  const [myClubs, setMyClubs] = useState(false)
  const [searchAllClubs, setSearchAllClubs] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [myID, setMyID] = useState(false)

  const handleClubClick = (club) =>{
    setBookClubSelected(club)
  }

  const toggleCreatingBookClub = () =>{
    setCreatingBookClub(!creatingBookClub)
  }

  const handleSearchClubsChange = (e) =>{
    setSearchAllClubs(e.target.value)
  }
  const handleOptionChange = (e) =>{
    setSearchType(e.target.value)
  }
  useEffect(() => {
    const fetchBookClubs = async () => {
        const bookClubsEntries = await getAllBookClubs()
        setBookClubs(bookClubsEntries);
        setMyID(bookClubsEntries.myid)
    };
    const fetchAllMyClubs = async () => {
      const myBookClubsEntries = await getAllMyClubs()
      setMyClubs(myBookClubsEntries);
 
  };
    fetchAllMyClubs()
    fetchBookClubs()
}, [bookClubSelected, creatingBookClub])

return (
  <div id="clubPage">
    {bookClubSelected ? (
      <SelectedBookClub myID={myID} bookClubSelected={bookClubSelected} setBookClubSelected={setBookClubSelected}/>
    ) : (
      <>
        
        {creatingBookClub ? <CreateBookClubComponent toggleCreatingBookClub={toggleCreatingBookClub}/>:(<>
          <div className="genericBox" id="welcome">
            <h1>WELCOME TO YOUR BOOK CLUBS</h1>
          </div>

          {bookClubs && bookClubs.result ?(<>
            {bookClubs.result.filter(club=>club['user']===myID).length>0 && <>
              <div className="genericBox" id="clubLeader">
                <h3>
                  BOOK CLUBS I MADE
                </h3>
            <button className="myButton" onClick={() => toggleCreatingBookClub()}>
              Create Book Club
            </button>
              </div>

              <ul id="clubCardsContainer">
                {bookClubs && bookClubs.result &&
                  bookClubs.result.filter(club=>club['user']===myID).map((club, index) => ( 
                    <ClubComponent click={()=>handleClubClick(club)} key={index} cover={club['book']['book_cover_id']} clubName={club['name']} bookTitle={club['book']['title']} />
                    ))}
              </ul>
            </>}
          
          {myClubs.result.length>0 &&<>
            <div className="genericBox" id="clubMember">
              <h3>
                BOOK CLUBS IM A MEMBER OF
              </h3>
            </div>
            <ul id="clubCardsContainer">
              {myClubs &&
                myClubs.result.map((club, index) => (
                  <ClubComponent click={()=>handleClubClick(club)} key={index} cover={club['book']['book_cover_id']} clubName={club['name']} bookTitle={club['book']['title']} />
                  ))}
            </ul>
          </>}   

          <div className="genericBox" id="allClubs">

            <h3>
              ALL BOOK CLUBS
            </h3>
            <h3>
              SEARCH CLUBS: <input type="search" value={searchAllClubs} onChange={handleSearchClubsChange} placeholder="Enter club name"/>
            </h3>
            <p id="custom-radio">SEARCH BY: 
              <label>
                <input type="radio" 
                name="searchtype" 
                value="name" 
                checked={searchType === 'name'} 
                onChange={handleOptionChange}/>
                CLUB NAME
              </label>
              <label>
                <input type="radio" 
                name="searchtype" 
                value="title" 
                checked={searchType === 'title'} 
                onChange={handleOptionChange}/>
                BOOK TITLE
              </label>
            </p>
          </div>
          <ul id="clubCardsContainer">
            {bookClubs && bookClubs.result &&
              bookClubs.result.filter((club)=>
              (searchType==="name"? club["name"]:club['book']['title']).toLowerCase()
              .includes(searchAllClubs.toLowerCase()))
              .map((club, index) => (
                <ClubComponent click={()=>handleClubClick(club)} key={index} cover={club['book']['book_cover_id']} clubName={club['name']} bookTitle={club['book']['title']} />
            ))}
          </ul>
          </>):null}
        </>)}
      </>
    )
    }
  </div>
)
}