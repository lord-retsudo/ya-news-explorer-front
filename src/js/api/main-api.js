import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class MainApiClient {
  constructor({ host, httpClient }) {
    if (httpClient === undefined) {
      this._httpClient = HttpClient.create();
    } else {
      this._httpClient = httpClient;
    }

    this._httpClient
      .setBaseUrl(host)
      .setResponseFormat(HttpClient.RESPONSE_JSON)
      .setMode(HttpRequest.MODE_CORS)
      .setCache(HttpRequest.CACHE_NO_CACHE)
      .setHeaders({
        'Content-Type': 'application/json',
      });

      // console.log('Api create!');
  }

  signup(name, email, password) {
    return this._httpClient.post('/signup', {
      body:   JSON.stringify({
        name, email, password,
      }),
      // {
      //  "email": email,
      //  "password": password,
      //  "name": name
      //},
    });
}

  signin(email, password) {
    return this._httpClient.post('/signin', {
      body: JSON.stringify({
        email, password,
      }),
    });
  }

  getUserInfo(token) {
    return this._httpClient.fetch('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createArticle({
    keyword, title, text, date, source, link, image,
  }, token) {
    return this._httpClient.post('/articles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    });
  }

  removeArticle(id, token) {
    return this._httpClient.delete(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getArticles(token) {
    return this._httpClient.fetch('/articles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

/*
export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }

  getUserInfo() {

    const url = this.baseUrl + '/users/me';
    // можно лучше
    // headers можно было целиком сделать получаемым параметром, передавать в класс объект заголовка
    return fetch(url, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  getInitialCards() {

    const url = this.baseUrl + '/cards';

    return fetch(url, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  sendUserInfo(name, about) {

    const url = this.baseUrl + '/users/me';

    return fetch(url, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });

  }

  sendCard(name, link) {

    const url = this.baseUrl + '/cards';

    return fetch(url, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

}

*/
