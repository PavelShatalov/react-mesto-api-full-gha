export const BASE_URL = 'https://api.pavel.student.nomoredomainsrocks.ru';



export const registrace = (password,email) => {
  console.log('email:', email, "passs", password)
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({  email:email, password: password })
  }).then(getResponseData)
  // console.log(JSON.stringify({ email, password }))
}
  // Answer
//   {
//     "data": {
//         "_id": "5f5204c577488bcaa8b7bdf2",
//         "email": "email@yandex.ru"
//     }
// } 

  export const authorizace = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      credentials: 'include',
      body: JSON.stringify({  email:email, password: password })
    }).then(getResponseData)}
    // Answer 
    // {
    //   "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
    // } 

  export const tokenValidate= () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Authorization": `Bearer ${token}`
      // },
      credentials: 'include',
    }).then(getResponseData)}
// Answer 
// {
//   "_id":"1f525cf06e02630312f3fed7",
//   "email":"email@email.ru"
// } 

export const jwtDelete= () => {
  const url = `${BASE_URL}/users/logout`;
  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(getResponseData);
}

  function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка2: ${res.status}`);
    }
    return res.json();
     // Возвращаем результат вызова res.json()
  }

  

// export const BASE_URL = 'https://api.nomoreparties.co';

// export const register = (username, password, email) => {
//   return fetch(`${BASE_URL}/auth/local/register`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({username, password, email})
//   })
//   .then((response) => {
//     return response.json();
//   })
//   .then((res) => {
//     return res;
//   })
//   .catch((err) => console.log(err));
// };
// export const authorize = (identifier, password) => {
//   return fetch(`${BASE_URL}/auth/local`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({identifier, password})
//   })
//   .then((response => response.json()))
//   .then((data) => {
//     if (data.user){
//       localStorage.setItem('jwt', data.jwt);
//       return data;
//     }
//   })
//   .catch(err => console.log(err))
// };
// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//   .then(res => res.json())
//   .then(data => data)