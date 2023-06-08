class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    //this.headers = data.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }


  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  //получение карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem('token');
    console.log(this.headers);
    return this._request(`${this.baseUrl}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  //получения информации о пользователе с сервера
  getUserInfo() {
    const token = localStorage.getItem('token');
    return this._request(`${this.baseUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  //изменение информации о пользователе
  changeUserInfo(newInfo) {
    const token = localStorage.getItem('token');
    const newName = newInfo.name;
    const newDescription = newInfo.description;
    return this._request(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
  }

  //изменение аватара пользователя
  changeAvatar(newInfo) {
    const token = localStorage.getItem('token');
    const newAvatar = newInfo.avatar;
    return this._request(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
  }

  //добавление новой карточки
  addNewCard(newCard) {
    const token = localStorage.getItem('token');
    const cardName = newCard.name;
    const cardLink = newCard.link;
    return this._request(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
  }

  //удаление карточки
  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this.baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  //поставить лайк
  setLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this.baseUrl}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  //убрать лайк
  removeLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this.baseUrl}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
};

const newApi = new Api({
  baseUrl: 'https://api.rin.dz.nomoredomains.rocks/',
})

export { newApi };