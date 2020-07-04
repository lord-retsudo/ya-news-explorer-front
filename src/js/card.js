import '../images/placeholder.png';
import User from './user/user';

export default class Card {
  constructor(backendApiClient) {
    this.api = backendApiClient;
  }

  save(card, object, cards) {
    if (User.getName() === null) return;

    this.api
      .createArticle({
        keyword: card.keyword,
        title: card.title,
        text: card.text,
        date: card.date,
        source: card.source,
        link: card.link,
        image: card.image,
      }, User.getToken())
      .then((response) => {
        cards = cards.map(item => {
          if (item.articleId === card.articleId) {
            card.articleId = response.id;
            return card;
          }
          return item;
        });

        object.classList.remove('icon_save_normal');
        object.classList.add('icon_save_marked');
        object.closest('.card').id = response.id;
      })
      .catch((error) => {
        alert('Произошла ошибка при добавлении статьи: ' + error);
      });
  }

  remove(cardId, object) {
    this.api
      .removeArticle(cardId, User.getToken())
      .then(() => {
        object.classList.remove('icon_save_marked');
        object.classList.add('icon_save_normal');
      })
      .catch((error) => {
        alert('Ошибка при удалении статьи: ' + error);
      });
  }

    create(props) {

    return `<li>
              <div id="${props.articleId}" class="card card_grow card_dir_ver">
              <span class="card__header">
                <i name="save-btn" class="icon icon_card icon_size_40 icon_save_normal"></i>
                <a id="tooltip-${props.articleId}" class="tooltip tooltip_notlogged">Войдите, чтобы сохранять статьи</a>
              </span>
              <img src="${props.image}" alt="card-${props.articleId}" class="search-result__card-image">
              <div class="card__body search-result__card-body">
                  <div class="search-result__card-created">${props.date}</div>
                  <h4 class="search-result__card-title">${props.title}</h4>
                  <p class="search-result__card-text">${props.text}</p>
              </div>
              <div class="card__footer search-result__card-footer">
                  <a href="${props.link}" target="_blank" class="search-result__card-source">${props.source}</a>
              </div>
            </div>
            </li>`;
    }

  createSaved(props) {

    return `<li>
              <div id="${props.articleId}" class="card card_grow card_dir_ver">
                <span class="card__header">
                  <i class="icon icon_card icon_size_40 icon_delete_normal"></i>
                  <a class="tooltip" href="https://www.google.com/search?q=${props.keyword}" target="_blank">${props.keyword}</a>
                </span>
                <img src="${props.image}" alt="card-${props.articleId}" class="search-result__card-image">
                <div class="card__body search-result__card-body">
                    <div class="search-result__card-created">${props.date}</div>
                    <h4 class="search-result__card-title"${props.title}</h4>
                    <p class="search-result__card-text">${props.text}</p>
                </div>
                <div class="card__footer search-result__card-footer">
                    <a href="${props.link}" target="_blank" class="search-result__card-source">${props.source}</a>
                </div>
              </div>
            </li>`;
  }

}
