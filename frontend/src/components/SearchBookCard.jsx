import './css/bookSearchCard.css'
import author from '../assets/author.png'
import title from '../assets/title.png'
import page from '../assets/page-counter.png'
export default function SearchBookCard({result, index, handleOpen}){

    let shortTitle = result.title;
    if (result.title.length > 29) {
      shortTitle = result.title.slice(0, 29) + "...";
    }
    
    return(<>
        <li id="searchBookCard"  key={index} >
            <div id="searchBookCardDiv" onClick={()=>handleOpen({title:result.title, author:result.author_name[0], pages:result.number_of_pages_median,book_cover_id:result.cover_i, open_library_id:result.key.split('/')[2]})}>
                <img className='bookImage'
                    src={result.cover_i ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` : '/default_book.png'}
                    alt="Book Cover"
                    
                />
                <div className='atpContainer'>
                    <img src={title} className="atpIcon"/><p className='atpItem'>{shortTitle}</p>
                    <hr className='bookCardLine' />
                    <img src={author} className="atpIcon"/> <p className='atpItem'>{result.author_name[0]}</p>
                    <hr className='bookCardLine' />
                    <img src={page} className="atpIcon"/><p className='atpItem'>{result.number_of_pages_median} pages</p>
                    
                   
                </div>
            </div>
        </li>
    
    
    </>)
}