const baseUrl = 'https://api.pavel.students.nomoredomainsrocks.ru';
// const baseUrl = 'http://localhost:3000'
class Api {

  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
   
  }
  _getDefaultHeaders() {
    return {
      authorization: `Bearer ${localStorage.jwt}`,
      'Content-Type': 'application/json',
    };
  }


  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
     // Включите передачу кук с запросом
     credentials: 'include',
    })
    .then(res => this._getResponseData(res));
  }

  // answer
  // {
  //   "name": "Jacques Cousteau",
  //   "about": "Sailor, researcher",
  //   "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
  //   "_id": "e20537ed11237f86bbb20ccb",
  //   "cohort": "cohort0"
  // }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;

    return fetch(url,{
      headers: this._getDefaultHeaders(),
      credentials: 'include',// Включите передачу кук с запросом
    })
    .then(res => this._getResponseData(res));
  }
 // answer
  // [
  //   {
  //     "likes": [],
  //     "_id": "5d1f0611d321eb4bdcd707dd",
  //     "name": "Байкал",
  //     "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  //     "owner": {
  //       "name": "Jacques Cousteau",
  //       "about": "Sailor, researcher",
  //       "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
  //       "_id": "ef5f7423f7f5e22bef4ad607",
  //       "cohort": "local"
  //     },
  //     "createdAt": "2019-07-05T08:10:57.741Z"
  //   },
  //   {
  //     "likes": [],
  //     "_id": "5d1f064ed321eb4bdcd707de",
  //     "name": "Архыз",
  //     "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  //     "owner": {
  //       "name": "Jacques Cousteau",
  //       "about": "Sailor, researcher",
  //       "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
  //       "_id": "ef5f7423f7f5e22bef4ad607",
  //       "cohort": "local"
  //     },
  //     "createdAt": "2019-07-05T08:11:58.324Z"
  //   }
  // ]


  setUserInfo({name, profession}) {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._getDefaultHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: profession
      })
    })
    .then(res => this._getResponseData(res));
  }
  // answer
  // {
  //   "name": "Marie Skłodowska Curie",
  //   "about": "Physicist and Chemist",
  //   "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
  //   "_id": "e20537ed11237f86bbb20ccb",
  //   "cohort": "cohort0",
  // }

  addNewCard({name, link}) {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: 'POST',
      headers: this._getDefaultHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    return fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._getDefaultHeaders(),
    })
    .then(res => this._getResponseData(res));
  }

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this._setLike(cardId);
    } else {
      return this._deleteLike(cardId);
    }
  }

  _setLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    return fetch(url, {
      method: 'PUT',
      headers: this._getDefaultHeaders(),
      credentials: 'include',
    })
    .then(res => this._getResponseData(res));
  }

  _deleteLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._getDefaultHeaders(),
      credentials: 'include',
    })
    .then(res => this._getResponseData(res))
  }

  changeAvatar(link) {
    
    const url = `${this._baseUrl}/users/me/avatar`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._getDefaultHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._getResponseData(res));
  }


  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json(); // Возвращаем результат вызова res.json()
  }
}

export const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: `Bearer ${localStorage.jwt}}`,
    'Content-Type': 'application/json'
  }
});