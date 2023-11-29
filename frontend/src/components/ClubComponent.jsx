import './css/clubComponent.css'
import title from '../assets/title.png'
import bookClub from '../assets/book-club.png'
export default function ClubComponent({click, cover, clubName, bookTitle}){


    return(<>
        <li onClick={click} className="lineItemStyles">
            <div className="clubContainer">
                <img className='bookImage' src={cover ? `https://covers.openlibrary.org/b/id/${cover}-M.jpg` : '/default_book.png'} alt="Book Cover"/>
                <div className='clubInfoContainer'>

                <img src={bookClub} className="clubItemIcon"/><p className='clubItemName'>{clubName}</p>
                <hr className='bookCardLine' />
                <img src={title} className="clubItemIcon"/><p className='clubItemName'>{bookTitle}</p>
                </div>
            </div>
        </li>
    </>)
}