class authenticationApi {
    constructor(data) {
        this.baseUrl = data.baseUrl;
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


    //регистрация 
    registration(info) {
        const newEmail = info.email;
        const newPassword = info.password;
        return this._request(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": newPassword,
                "email": newEmail
            })
        })
    }


    //авторизация 
    authorization(password, email) {
        return this._request(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, email})
        })
    }


    //проверка валидности токена и получение email для вставки в шапку сайта
    tokenValidityCheck(token) {
        return this._request(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    }

}

const newAuthApi = new authenticationApi({
    baseUrl: 'https://auth.nomoreparties.co'
})

export { newAuthApi };