import './styles.css';
import './images/favicon.png';

import Page from './js/util/page';
import User from './js/user/user';
import Menu from './js/menu';
import MainApiClient from './js/api/main-api';
import Config from './js/config';
import HttpClient from './js/http-client/http-client';
import HttpRequestError from './js/http-client/http-request-error';
import Card from "./js/card.js"
import CardList from './js/card-list';

(function () {

if (User.getName() === null) {
  Page.redirect('index.html');
}

const menu = new Menu();

menu.setUserName(User.getName());

const mainApi = new MainApiClient({
  host: Config.BACKEND_API_HOST,
  httpClient: HttpClient.create(),
});

const cardsContainer = document.getElementById('cards');
const welcomeText = document.getElementById('welcome');
const statText = document.getElementById('articleStat');

const cardsList = new CardList(cardsContainer);

const article = new Card(mainApi);

let newsCards = [];

let counter = 0;

function refresh() {
  const keywordsList = [];

  mainApi
    .getArticles(User.getToken())
    .then((articles) => {

      menu.removeCards(cardsContainer);

      if (articles.data.length === 0) {

        menu.hideSearchResultSection();
        menu.showNoResultSection();
      } else {
        menu.showSearchResultSection();
        menu.hideNoResultSection();
      }

      articles.data.forEach((item) => {
        if (!keywordsList.includes(item.keyword)) {
          keywordsList.push(item.keyword);
        }
      });

      newsCards = articles.data.map((item) => {

        return {
          articleId: item._id,
          keyword: item.keyword,
          title: item.title,
          text: item.text,
          date: item.date,
          source: item.source,
          link: item.link,
          image: item.image,
        };
      });

      welcomeText.textContent = User.getName() + ', у вас ' + articles.data.length + ' сохранённых статей';
      if (keywordsList.length > 3) statText.textContent = keywordsList.slice(0, 2).join(', ') + ' и ' + (keywordsList.length - 2) + ' другим';
      else statText.textContent = keywordsList.join(', ');

      counter = 0;

      const partCards = newsCards.slice(counter, 3);

      if (newsCards.length > 3) menu.showMoreButton();
      cardsList.renderSaved(partCards);
      counter = 3;
    })
    .catch((error) => {
      alert('Не смогли загрузить список статей: ' + error);
    });
}

document.getElementById('moreButton').addEventListener('click', function() {
  const newCounter = counter + 3;
  const partCards = newsCards.slice(counter, newCounter);
  if (newsCards.length - counter < 3) menu.hideMoreButton();
  cardsList.renderSaved(partCards);
  counter = newCounter;
});

document.getElementById('cards').addEventListener('click', function() {
  const origId = event.target.closest('.card').id;
  if(event.target.className = 'icon icon_card icon_size_40 icon_delete_normal') {
    article.remove(origId, event.target);
    refresh();
  }
});

const mobileMenuLogged = document.getElementById('mobileMenuLogged');
const desktopMenu = document.getElementById('desktopMenu');
const logoMenuItem = document.getElementById('logoMenuItem');
const menuToggleIcon = document.getElementById('menuToggleIcon');

document.getElementById('menuToggleButton').addEventListener('click', function () {

  // console.log('click!');

  if(mobileMenuLogged.style.display == 'flex'){
    mobileMenuLogged.style.display = 'none';
    desktopMenu.style.backgroundColor = 'transparent';

    logoMenuItem.classList.remove('nav__item_style_light');
    logoMenuItem.classList.add('nav__item_style_dark');

    desktopMenu.classList.remove('header__desktop-menu_separator_light');
    desktopMenu.classList.add('header__desktop-menu_separator_dark');
    menuToggleIcon.classList.remove('icon_menu_white');
    menuToggleIcon.classList.add('icon_menu_black');
  }
  else {
    mobileMenuLogged.style.display = 'flex';
    desktopMenu.style.backgroundColor = '#1A1B22';
    logoMenuItem.classList.remove('nav__item_style_dark');
    logoMenuItem.classList.add('nav__item_style_light');

    desktopMenu.classList.remove('header__desktop-menu_separator_dark');
    desktopMenu.classList.add('header__desktop-menu_separator_light');
    menuToggleIcon.classList.remove('icon_menu_black');
    menuToggleIcon.classList.add('icon_menu_white');
  }
});

window.addEventListener('resize', function () {
  mobileMenuLogged.style.display = 'none';
  desktopMenu.style.backgroundColor = 'transparent';

  logoMenuItem.classList.remove('nav__item_style_light');
  logoMenuItem.classList.add('nav__item_style_dark');

  desktopMenu.classList.remove('header__desktop-menu_separator_light');
  desktopMenu.classList.add('header__desktop-menu_separator_dark');
  menuToggleIcon.classList.remove('icon_menu_white');
  menuToggleIcon.classList.add('icon_menu_black');
});

refresh();
})();