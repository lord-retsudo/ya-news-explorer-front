import '../images/placeholder.png';

export default class Card {
    constructor () {
    }

    save (event) {
        // event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove (event, cardlist) {
        // cardlist.removeChild(event.target.closest('.place-card'));
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
