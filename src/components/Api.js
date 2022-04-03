export default class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _checkResOk(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }

    editUserInfo(userData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }

    createUserCard(cardItem) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardItem.name,
                link: cardItem.link
            })
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }

    cardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }

    cardDislike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }

    deleteUserCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }

    editAvatar(userData) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userData.avatar
            })
        })
            .then(this._checkResOk)
            .then((data) => {
                return data;
            });
    }
}