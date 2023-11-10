import { useState } from "react";

import { fetchBooks } from "../api/backend_calls";
import DetailedBookView from "../components/DetailedBookView";
import SearchBookCard from "../components/SearchBookCard"

export default function Search() {
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
        item.hasOwnProperty('key') &&
        item.hasOwnProperty('cover_i')
      );
    });
  }

  const handleNextPage = async () =>{
    const nextPage=resultPage+1
    const context = { title };
    const results = await fetchBooks(context, searchType, nextPage);
    const useableBooks = filterResults(results)
    const tenBooks = useableBooks.slice(0)
    console.log(tenBooks, "nextPage")
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
    console.log(tenBooks, "nextPage")
    setSearchResults(tenBooks)
    setResultPage(prevPage)
    setLastPage(false)
    return results
  }
  const handleSubmit = async (e) => {
    setLastPage(false)
    setNoResults(false)
    e.preventDefault();

    const context = { title };
    const results = await fetchBooks(context, searchType, 1);
    const useableBooks = filterResults(results)
    const tenBooks = useableBooks.slice(0)
    console.log(tenBooks, "search")
    if(tenBooks.length===0){setNoResults(true)}
    setSearchResults(tenBooks)
    setResultPage(1)
    setIsSearchPressed(true)
  };


    return(<>
    <DetailedBookView open={open} setOpen={setOpen} bookInfo={clickedBook}/>
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
    {resultPage > 1 ? <button onClick={handlePrevPage}>prev page</button>:null}
    {!lastPage ? <button onClick={handleNextPage}>next page</button>:null}
    {isSearchPressed?(<><h2>Search Results: </h2>
    <h3>Page: {resultPage}</h3></>):null}
  {lastPage ? "no more results":null}
  {noResults ? "no results matching your query":null}
  <ul>
    {searchResults.map((result, index) => (
      <SearchBookCard key={index} result={result} index={index} handleOpen={handleOpen}/>
    ))}
  </ul>
</div>
   
    </>
    )
}