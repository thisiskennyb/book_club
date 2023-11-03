import { useState } from "react";

export default function Search() {
const [title, setTitle] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [searchType, setSearchType] = useState("title"); // Default to searching by title

const fetchBooks = async (context) => {
  let useableContext = context.title.replace(/ /g, "+")
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
   
  }
  try {
    let url;
    if (searchType === "author") {
      url = `http://localhost:8000/api/search/author/?author=${useableContext}`;
    } else if (searchType === "title") {
      url = `http://localhost:8000/api/search/title/?title=${useableContext}`;
    }
    else {
      console.log(context)
      const subjects = context.title.split(' ');
      const formattedSubjects = subjects.map(subject => `subject:${subject}`);
      const subjectContext = formattedSubjects.join('+');
      url = `http://localhost:8000/api/search/subject/?subject=${subjectContext}`
    }
    console.log(url)
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();

    if (apiJSON.docs) {
      console.log(apiJSON.docs)
      setSearchResults(apiJSON.docs);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleInputChange = (e) => {
  const { value } = e.target;
  setTitle(value);
};

const handleSearchTypeChange = (e) => {
  setSearchType(e.target.value);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const context = { title };
  await fetchBooks(context);
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
            <li key={index}>
              Author: {result.author_name}, Title: {result.title}, Pages: {result.number_of_pages_median}
              <img src={result.cover_i ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`:'/default_book.png'} alt="Book Cover" />
            </li>
          ))}
        </ul>
      </div>
   
    </>
    )
}