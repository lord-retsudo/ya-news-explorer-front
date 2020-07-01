export default class Config {
  static get BACKEND_API_HOST() {
//    return 'http://breakingnews-explorer.ml';
      return 'http://localhost:3000/api';
  }

  static get NEWS_API_TOKEN() {
    return '7ece4b5cceff42208e54c68ffd2f542d';
  }

  static get NEWS_API_LANGUAGE() {
    return 'ru';
  }

  static get ERROR_TXT_NO_BLANK_ALLOWED() {
    return 'Нужно ввести ключевое слово';
  }

  static get ERROR_TXT_REQUEST_NOT_COMPLETED() {
    return `Во время запроса произошла ошибка.
    Возможно, проблема с соединением или сервер недоступен.
    Подождите немного и попробуйте ещё раз`;
  }
}
