

export default function SearchBookCard({result, index, handleOpen}){


    return(<>
        <li id="searchBookCard" style={{margin:"10px", display:"inline-block"}} key={index} >
            <div onClick={()=>handleOpen({title:result.title, author:result.author_name[0], pages:result.number_of_pages_median,book_cover_id:result.cover_i, open_library_id:result.key.split('/')[2]})} style={{ border: '1px solid black', maxWidth:'150px', marginBottom: '10px' }}>
                <img
                    src={result.cover_i ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` : '/default_book.png'}
                    alt="Book Cover"
                    style={{ maxWidth: '150px', marginRight: '10px' }}
                />
                <div>
                    <p>Author: {result.author_name[0]}</p>
                    <p>Title: {result.title}</p>
                    <p>Pages: {result.number_of_pages_median}</p>
                    <p>Key: {result.key.split('/')[2]}</p>
                </div>
            </div>
        </li>
    
    
    </>)
}