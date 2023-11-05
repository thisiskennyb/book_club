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