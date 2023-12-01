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
  const [resultsShowing, setResultsShowing] = useState([0,10])
  const [pagesOfBooks, setPagesOfBooks] = useState(false)

  const [allResults, setAllResults] =useState(false)
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

  const handleNextPage = () =>{
    const nextPage = [resultsShowing[0]+10,resultsShowing[1]+10]
    const tenBooks = allResults.slice(nextPage[0],nextPage[1])
    if(tenBooks.length===0){setLastPage(true)}
    setSearchResults(tenBooks)
    setResultsShowing(nextPage)
    setResultPage(resultPage+1)
  }
  const handlePrevPage = async () =>{
    const prevPage = [resultsShowing[0]-10,resultsShowing[1]-10]
    const tenBooks = allResults.slice(prevPage[0],prevPage[1])
    setSearchResults(tenBooks)
    setResultsShowing(prevPage)
    setResultPage(resultPage-1)
    setLastPage(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLastPage(false)
    setNoResults(false)
    setBooksLoaded(false)
    setIsSearchPressed(false)
    const context = { title };
    const results = await fetchBooks(context, searchType);
    const useableBooks = filterResults(results)
    setAllResults(useableBooks)
    const tempPages = useableBooks%10 
    setPagesOfBooks(tempPages)
    const tenBooks = useableBooks.slice(resultsShowing[0],resultsShowing[1])
    if(tenBooks.length===0){setNoResults(true)}
    setSearchResults(tenBooks)
    setResultPage(1)
    setResultsShowing([0,10])
    setIsSearchPressed(true)
    setBooksLoaded(true)
  };

    return(<div id="searchPage">
    <DetailedBookView open={open} buttons={true} setOpen={setOpen} bookInfo={clickedBook} onClose={() => setOpen(false)}/>
      <div className="genericBox">
        <h1>Find Your Next Literary Adventure</h1>
      </div>
      
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="custom-select" id="title">
          <label htmlFor="title">Search by:</label>
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
          </select>
          <input
            id="title"
            type="search"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="Search"
            required
            />
        <button className="myButton" type="submit">Search</button>
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