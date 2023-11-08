import { useState } from "react";
import { saveToList } from "../api/backend_calls";
import { fetchBooks } from "../api/backend_calls";
export default function Search() {
const [title, setTitle] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [searchType, setSearchType] = useState("title"); // Default to searching by title

const handleInputChange = (e) => {
  const { value } = e.target;
  setTitle(value);
};

const handleSearchTypeChange = (e) => {
  setSearchType(e.target.value);
};

function filterResults(results) {
  return results.filter(item => {
    return (
      item.hasOwnProperty('author_name') &&
      item.hasOwnProperty('title') &&
      item.hasOwnProperty('number_of_pages_median') &&
      item.hasOwnProperty('key') &&
      item.hasOwnProperty('cover_i')
    );
  });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const context = { title };
  const results = await fetchBooks(context, searchType);
  const useableBooks = filterResults(results)
  const tenBooks = useableBooks.slice(0,10)
  setSearchResults(tenBooks)
};
const handleSave = (index, list, context) => {
  const info = {"book":context}
  saveToList(info, list)
  
};

    return(<>
        <div>This is Search</div>
  
      <form onSubmit={handleSubmit}>
        <div id="title">
          <label htmlFor="title">Search by:</label>
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
          </select>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            required
          />
        </div>
        {searchType=="subject"?<p>space between terms. connected words by underscore. eg. outer_space pirate</p>:null}
        <button type="submit">Search</button>
      </form>
      <div>
  <h2>Search Results:</h2>
  <ul>
    {searchResults.map((result, index) => (
      <li style={{margin:"10px", display:"inline-block"}} key={index}>
        <div style={{ border: '1px solid black', maxWidth:'150px', marginBottom: '10px' }}>
          <img
            src={result.cover_i ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` : '/default_book.png'}
            alt="Book Cover"
            style={{ maxWidth: '150px', marginRight: '10px' }}
          />
          <div>
            <p>Author: {result.author_name}</p>
            <p>Title: {result.title}</p>
            <p>Pages: {result.number_of_pages_median}</p>
            <p>Key: {result.key.split('/')[2]}</p>
          </div>
          <button onClick={() => handleSave(index, "to-be-read", {title:result.title, author:result.author_name, pages:result.number_of_pages_median,book_cover_id:result.cover_i, open_library_id:result.key.split('/')[2]})}>to-be-read</button>
          <button onClick={() => handleSave(index, "completed", {title:result.title, author:result.author_name[0], pages:result.number_of_pages_median,book_cover_id:result.cover_i, open_library_id:result.key.split('/')[2]})}>completed</button>
          
          
        </div>
      </li>
    ))}
  </ul>
</div>
   
    </>
    )
}