export default class User {

  static logout() {
    window.localStorage.removeItem('user.token');
    window.localStorage.removeItem('user.name');
    window.localStorage.removeItem('user.email');
  }

  static login(name, email, token) {
    window.localStorage.setItem('user.token', token);
    window.localStorage.setItem('user.name', name);
    window.localStorage.setItem('user.email', email);
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
