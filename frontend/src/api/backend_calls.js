async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  
  
  export async function signup(context, url) {
  
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${url}accounts/signup/`,payload)
    return body
  }
  
  export async function login(context, url) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${url}accounts/get-token`, payload)
    return body.token
  }

  export async function saveToList(context, list) {
    const endpoint= `http://localhost:8000/api/book-list/${list}/`
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
    }
    const apiData = await fetch(endpoint, payload)
    const apiJSON = await apiData.json()
    return apiJSON
  }


  export const fetchBooks = async (context, searchType) => {
    let useableContext = context.title.replace(/ /g, "+")

    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}

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
     
      const apiData = await fetch(url,payload);
      const apiJSON = await apiData.json();
  
      if (apiJSON.docs) {
        return apiJSON.docs
      }
    } catch (error) {
     
      return console.error("Error fetching data:", error);
    }
  };

  export const profilePage = async () => {

    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}
    try {
      let url=`http://localhost:8000/api/book-list`
      const apiData = await fetch(url,payload);
      const apiJSON = await apiData.json();
  
      if (apiJSON) {
        return apiJSON
      }
    } catch (error) {
     
      return console.error("Error fetching data:", error);
    }
  };
  