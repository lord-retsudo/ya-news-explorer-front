import '../images/placeholder.png';
import User from '../js/user/user';

export default class Card {
    constructor (backendApiClient) {
      this.api = backendApiClient;
    }

    save (card, object, cards) {
        // event.target.classList.toggle('place-card__like-icon_liked');

          if (User.getName() === null) {
            return;
          }


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
                  else return item;
                });

                object.classList.remove('icon_save_normal');
                object.classList.add('icon_save_marked');
                object.closest('.card').id = response.id;

                console.log(response.id);
                console.log(cards);
                alert('Статья ' + response.id + ' была сохранена!');
          /*
                saveBtn.ClassList.remove('icon_save_normal');
                saveBtn.ClassList.remove('icon_save_hover');
                saveBtn.ClassList.add('icon_save_marked');
                this.HtmlElement.setAttribute('news-card', response.id);
                this.fireEvent('saveitem');
          */
              })
              .catch((error) => {

                console.log(error);
                /*
                error.Response.json().then((errorBody) => {
                  MsgBox.error('Ошибка при сохранении статьи', errorBody.message.replace(/&quot;/g, '"'));
                });
                */
              });

              // return object.closest('.card').id;

/*
          if (this.HtmlElement.hasAttribute('news-card')) {
            backendApiClient
              .removeArticle(this.HtmlElement.getAttribute('news-card'), User.getToken())
              .then(() => {
                MsgBox.msg('Удаление статьи', 'Статья была удалена!');
                saveBtn.ClassList.add('icon_save_normal');
                saveBtn.ClassList.remove('icon_save_hover');
                saveBtn.ClassList.remove('icon_save_marked');
                this.HtmlElement.removeAttribute('news-card');
                this.fireEvent('deleteitem');
              })
              .catch((error) => {
                error.Response.json().then((errorBody) => {
                  MsgBox.error('Ошибка при удалении  статьи', errorBody.message.replace(/&quot;/g, '"'));
                });
              });
          } else {
            backendApiClient
              .createArticle({
                keyword: this._keyword,
                title: this._title,
                text: this._contentText,
                date: this._createdAt,
                source: this._sourceLabel,
                link: this._sourceLink,
                image: this._imageLink,
              }, User.getToken())
              .then((response) => {
                MsgBox.msg('Сохранение статьи', 'Статья была сохранена!');
                saveBtn.ClassList.remove('icon_save_normal');
                saveBtn.ClassList.remove('icon_save_hover');
                saveBtn.ClassList.add('icon_save_marked');
                this.HtmlElement.setAttribute('news-card', response.id);
                this.fireEvent('saveitem');
              })
              .catch((error) => {
                error.Response.json().then((errorBody) => {
                  MsgBox.error('Ошибка при сохранении статьи', errorBody.message.replace(/&quot;/g, '"'));
                });
              });
          }
        });

       */

    }

    remove (event, cardlist) {
        // cardlist.removeChild(event.target.closest('.place-card'));
/*
        delBtn.on('click', () => {
          backendApiClient
            .removeArticle(this.HtmlElement.getAttribute('news-card'), User.getToken())
            .then(() => {
              this.destroy(true);
              this.fireEvent('deleteitem');
            })
            .catch((error) => {
              error.Response.json().then((errorBody) => {
                MsgBox.error('Ошибка при удалении  статьи', errorBody.message.replace(/&quot;/g, '"'));
              });
            });
        });
*/
    }

    create (props) {

      let imageLink = './images/placeholder.png';
      if (props.image !== null) imageLink = props.image;

      return `<li>
                <div id="${props.articleId}" class="card card_grow card_dir_ver">
                <span class="card__header">
                  <i name="save-btn" class="icon icon_card icon_size_40 icon_save_normal"></i>
                </span>
                <img src="${imageLink}" alt="card1" class="search-result__card-image">
                <div class="card__body search-result__card-body">
                    <div class="search-result__card-created">
                        ${props.date}
                    </div>
                    <h4 class="search-result__card-title">${props.title}</h4>
                    <p class="search-result__card-text">${props.text}</p>
                </div>
                <div class="card__footer search-result__card-footer">
                    <a href="${props.link}" target="_blank" class="search-result__card-source">
                        ${props.source}
                    </a>
                </div>
              </div>
              </li>`;


/*
      const newsCard = document.createElement('div');
      const placeCardImage = document.createElement('div');
      const placeCardDeleteIcon = document.createElement('button');
      const placeCardDescription = document.createElement('div');
      const placeCardName = document.createElement('h3');
      const placeCardLikeIcon = document.createElement('button');

      placeCard.classList.add('place-card');
      placeCardImage.classList.add('place-card__image');
      placeCardImage.style.backgroundImage = `url('${link}')`;
      placeCardDeleteIcon.classList.add('place-card__delete-icon');
      placeCardDescription.classList.add('place-card__description');
      placeCardName.classList.add('place-card__name');
      placeCardName.textContent = name;
      placeCardLikeIcon.classList.add('place-card__like-icon');

      placeCard.appendChild(placeCardImage);
      placeCardImage.appendChild(placeCardDeleteIcon);
      placeCard.appendChild(placeCardDescription);
      placeCardDescription.appendChild(placeCardName);
      placeCardDescription.appendChild(placeCardLikeIcon);

      return  placeCard;
     */
    }
/*
    static createFromHtml(html) {
      if (typeof html !== 'string') {
        throw new Error('Expected string');
      }
      const tmp = document.createElement('span');
      tmp.insertAdjacentHTML('afterbegin', html);
      return tmp.firstChild;
    }

    static create(def, wrap) {
      let el;
      if (typeof def === 'string') {
        el = Element.createFromHtml(def);
      } else {
        el = Element.createFromDef(def);
      }
      if (wrap === true) {
        el = new this(el);
      }
      return el;
    }

    html(html) {
      this.removeChild();
      this.insertHTML(html);
    }

    insertHTML(html, position) {
      const insertPosition = position || 'afterbegin';
      if (this._htmlElement) {
        this._htmlElement.insertAdjacentHTML(insertPosition, html);
      }
      return this;
    }
*/

  }
