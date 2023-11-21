// const base_url = import.meta.env.VITE_BASE_URL
const base_url = "http://localhost:8000/api/"
async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  

  export async function signup(context) {
  
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${base_url}accounts/signup/`,payload)
    return body
  }
  
  export async function login(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${base_url}accounts/get-token`, payload)
    return body.token
  }

  export async function saveToList(context, list) {
    const endpoint= `${base_url}book-list/${list}/`
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


  export const fetchBooks = async (context, searchType, result_page) => {
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
        url = `${base_url}search/author/?author=${useableContext}&resultpage=${result_page}`;
      } else if (searchType === "title") {
        url = `${base_url}search/title/?title=${useableContext}&resultpage=${result_page}`;
      }
      else {
        console.log(context)
        const subjects = context.title.split(' ');
        const formattedSubjects = subjects.map(subject => `subject:${subject}`);
        const subjectContext = formattedSubjects.join('+');
        url = `${base_url}search/subject/?subject=${subjectContext}&resultpage=${result_page}`
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

  export const profilePage = async (pk=null) => {
    let profilepk = '/'
    if(pk!==null){
      profilepk=`/${pk}`
    }
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}
    try {
      let url=`${base_url}book-list${profilepk}`
      const apiData = await fetch(url,payload);
      const apiJSON = await apiData.json();
  
      if (apiJSON) {
        return apiJSON
      }
    } catch (error) {
     
      return console.error("Error fetching data:", error);
    }
  };
  
  export const fetchDetailedBook = async (OLID) => {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}

      let url = `${base_url}search/detail/?OLID=${OLID}`;
      const apiData = await fetch(url,payload);
      const apiJSON = await apiData.json();
      return apiJSON
      
  };

  export const setRecommended = async (pk) => {
    const payload = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body:{}
    }

      let url = `${base_url}book-list/completed/${pk}/`;
      const apiData = await fetch(url,payload);
      const apiJSON = await apiData.json();
      return apiJSON
      
  };

  export const setRatings = async (pk, rating) => {
    const payload = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({"rating": rating})
    }

      let url = `${base_url}book-list/completed/${pk}/`;
      const apiData = await fetch(url,payload);
      const apiJSON = await apiData.json();
      return apiJSON
      
  };

  export const fetchOtherUsersSameBook = async (OLID) => {
    console.log(OLID)
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}
      let url = `${base_url}book-list/others-completed/${OLID}`;
      const apiData = await fetch(url,payload);
      const apiJSON = await apiData.json();
      return apiJSON
  };

  export const createBookClub = async (bookPk, bookClubName) =>{
    console.log(bookClubName)
    const context= {"book":bookPk, "name":bookClubName}
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
      ,}
    let url = `${base_url}book-club/`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  }

  export const getAllBookClubs = async (pk = null) =>{
    let bookClubPk = ''
    if(pk !==null){
      bookClubPk = `${pk}`
    }
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}
    let url = `${base_url}book-club/${bookClubPk}`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  }

  export const modifyClub = async (clubPk, modifier) =>{
    const context= {modifier}
    const payload = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context),
    }
    let url = `${base_url}book-club/${clubPk}`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  }
  export const getAllMyClubs = async () =>{
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}
    let url = `${base_url}book-club/myclubs`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  }


  export const getPagesCompleted = async (userID) =>{
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}
    let url = `${base_url}accounts/page-amount/`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  } 
  
  export const getUserPagesCompleted = async (userID) =>{
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },}
    let url = `${base_url}accounts/page-amount/${userID}`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  }

  export const updatePagesCompleted = async (context) =>{
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
      ,}
    let url = `${base_url}accounts/page-amount/`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  }

  export const decreasePagesCompleted = async (context) =>{
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(context)
      ,}
    let url = `${base_url}accounts/page-decrease/`;
    const apiData = await fetch(url,payload);
    const apiJSON = await apiData.json();
    return apiJSON
  }

export const deleteFromList = async (completedBookId) => {
    const payload = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
    }

    let url=`${base_url}book-list/completed/${completedBookId}/`
    const response = await fetch(url, payload);
    // console.log(bookInfo.open_library_id)

    if (response.status === 204) {
        console.log("Book deleted")
    profilePage()
    } else {
        console.error("Not deleted")
    }
}

export const deleteCompletedBook = async (completedBookId) => {
  const payload = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
      },
  }

  let url=`${base_url}book-list/completed/${completedBookId}/`
  const response = await fetch(url, payload);
  return response
}

export const tbrDelete = async (tbrBookId) => {
  const payload = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
      },
  }

  let url=`${base_url}book-list/to-be-read/${tbrBookId}/`
  const response = await fetch(url, payload);
}
export const getBookClubMessageBoard = async (clubPk) =>{
  
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },}
  let url = `${base_url}book-club/message-board/${clubPk}`;
  const apiData = await fetch(url,payload);
  const apiJSON = await apiData.json();
  return apiJSON
}

export const addClubMessage = async (clubPk, message) =>{
  const context ={"message":message}
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(context),
  }
  let url = `${base_url}book-club/message-board/${clubPk}`;
  const apiData = await fetch(url,payload);
  const apiJSON = await apiData.json();
  return apiJSON
}

export const deleteMessage = async (messagePk) =>{

  const payload = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  }
  let url = `${base_url}book-club/message-board/${messagePk}`;
  const apiData = await fetch(url,payload);
  if (apiData.ok) {
    return { success: true }; 
  } else {
    return { success: false, status: apiData.status }; 
  }

}

export const deleteMyClub = async (clubPk) =>{

  const payload = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  }
  let url = `${base_url}book-club/${clubPk}`;
  const apiData = await fetch(url,payload);
  if (apiData.ok) {
    return { success: true }; 
  } else {
    return { success: false, status: apiData.status }; 
  }
 
}

export const getMemberClubs = async (memberPK) =>{
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },}
  let url = `${base_url}book-club/clubs/${memberPK}`;
  const apiData = await fetch(url,payload);
  const apiJSON = await apiData.json();
  return apiJSON
} 

