import { useState } from "react";
import './css/bookSearch.css'
import { fetchBooks } from "../api/backend_calls";
import DetailedBookView from "../components/DetailedBookView";
import SearchBookCard from "../components/SearchBookCard"

import CircularProgress from '@mui/material/CircularProgress';

export default function Search() {
  const [booksLoaded, setBooksLoaded] = useState(true)
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("title"); 
  const [resultPage, setResultPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [clickedBook, setClickedBook] = useState({})
  const [isSearchPressed, setIsSearchPressed] = useState(false)
  const handleOpen = (Book) => {
    setClickedBook(Book)
    setOpen(true);
  }
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
        item.hasOwnProperty('key') 
      );
    });
  }

  const handleNextPage = async () =>{
    const nextPage=resultPage+1
    const context = { title };
    const results = await fetchBooks(context, searchType, nextPage);
    const useableBooks = filterResults(results)
    const tenBooks = useableBooks.slice(0)
    if(tenBooks.length===0){setLastPage(true)}
    setSearchResults(tenBooks)
    setResultPage(nextPage)
    return results
  }
  const handlePrevPage = async () =>{
    const prevPage=resultPage-1
    const context = { title };
    const results = await fetchBooks(context, searchType, prevPage);
    const useableBooks = filterResults(results)
    const tenBooks = useableBooks.slice(0)
    setSearchResults(tenBooks)
    setResultPage(prevPage)
    setLastPage(false)
    return results
  }
  const handleSubmit = async (e) => {
    setLastPage(false)
    setNoResults(false)
    setBooksLoaded(false)
    setIsSearchPressed(false)
    e.preventDefault();

    const context = { title };
    const results = await fetchBooks(context, searchType, 1);
  
    const useableBooks = filterResults(results)
    const tenBooks = useableBooks.slice(0)
    if(tenBooks.length===0){setNoResults(true)}
    setSearchResults(tenBooks)
    setResultPage(1)
    setIsSearchPressed(true)
    setBooksLoaded(true)
  };

    return(<div id="searchPage">
    <DetailedBookView open={open} buttons={true} setOpen={setOpen} bookInfo={clickedBook} onClose={() => setOpen(false)}/>
      
        <h1>Find Your Next Literary Adventure</h1>
  
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
        <button type="submit">Search</button>
        </div>
        {searchType=="subject"?<p>Space between terms. Connected words by underscore. Ex. outer_space pirate</p>:null}
      </form>
      <div>
    {isSearchPressed?(<><h2>Search Results: </h2>
    <h3>Page: {resultPage}</h3></>):null}
    {resultPage > 1 ? <button onClick={handlePrevPage}>Prev Page</button>:null}
    {!lastPage && isSearchPressed? <button onClick={handleNextPage}>Next Page</button>:null}
  {lastPage ? "no more results":null}
  {noResults ? "no results matching your query":null}
  <ul id="bookCardContainer">
    {booksLoaded ? searchResults.map((result, index) => (
      <SearchBookCard key={index} result={result} index={index} handleOpen={handleOpen}/>
    )):<div id="loadingCircle"><CircularProgress/></div>}
  </ul>
</div>
   
    </div>
    )
}