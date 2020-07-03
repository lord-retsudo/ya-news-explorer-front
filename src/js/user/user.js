// import MainApiClient from '../api/main-api';
// import Config from '../config';
// import Dialog from '../../components/dialog/dialog';
// import { notify } from '../component/event-bus';
// import MsgBox from '../component/msg-box/msg-box';
// import HttpClient from '../http-client/http-client';
// import HttpRequestError from '../http-client/http-request-error';
// import Element from '../component/element';

/*
const backendApiClient = new BackendApiClient({
  host: Config.BACKEND_API_HOST,
  httpClient: HttpClient.create(),
});
*/
export default class User {
  /*
  static get EVENT_USER_LOGOUT() {
    return 'USER_LOGOUT';
  }

  static get EVENT_USER_SIGNIN() {
    return 'USER_SIGNIN';
  }
*/


  static logout() {
    window.localStorage.removeItem('user.token');
    window.localStorage.removeItem('user.name');
    window.localStorage.removeItem('user.email');
    // notify(User.EVENT_USER_LOGOUT);
  }

  static login(name, email, token) {
    window.localStorage.setItem('user.token', token);
    window.localStorage.setItem('user.name', name);
    window.localStorage.setItem('user.email', email);
    // notify(User.EVENT_USER_SIGNIN, { name, email, token });
  }

  static getName() {
    return window.localStorage.getItem('user.name');
  }

  static getEmail() {
    return window.localStorage.getItem('user.email');
  }

  static getToken() {
    return window.localStorage.getItem('user.token');
  }
}
