import Card from './card';

export default class CardList extends Card {
  constructor(container) {
    super();
    this.container = container;
  }

  addCard(cardHtml) {
    this.container.insertAdjacentHTML('beforeEnd', cardHtml);
  }

  render(newsCards) {
    newsCards.forEach((article) => {
      this.addCard(this.create(article));
    });
  }

  renderSaved(newsCards) {
    newsCards.forEach((article) => {
      this.addCard(this.createSaved(article));
    });
  }
}
