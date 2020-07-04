export default class DateConverter {

  static decodeMonth(month) {
    const dic = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октебря',
      'ноября',
      'декабря',
    ];

    return dic[month];
  }

  static formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate()} ${DateConverter.decodeMonth(date.getMonth())}, ${date.getFullYear()}`;
  }
}
