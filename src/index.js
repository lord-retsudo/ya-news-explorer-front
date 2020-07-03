import './styles.css';

// import Api from './js/api/main-api.js'
/*
import Card from "./js/card.js"
import PopupImage from './js/popupimage.js'
import CardList from "./js/cardlist.js"

import UserInfo from './js/userinfo.js'
import Popup from './js/popup.js'
import PopupProfile from './js/popupprofile.js'
*/

import MainApiClient from './js/api/main-api';
import NewsApiClient from './js/api/news-api';
import Config from './js/config';
import Menu from './js/menu';
import HttpClient from './js/http-client/http-client';
import HttpRequestError from './js/http-client/http-request-error';
import User from './js/user/user';
import DateConverter from './js/util/date-converter';
import UuidGenerator from './js/util/uuid-generator';

import FormValidator from './js/popup/formvalidator.js'
import PopupSignIn from './js/popup/popup-signin.js'
import PopupSignUp from './js/popup/popup-signup.js'
import PopupSuccess from './js/popup/popup-success.js'
import Card from "./js/card.js"
import CardList from './js/card-list';

(function () {

  const root = document.querySelector('.root');
//  const placesList = document.querySelector('.places-list');

  const popupSignInParams = {
    popupSignIn: document.querySelector('#dialog_signin_block'),
    formSignIn: document.forms.signin,
    openSignInButton: document.querySelector('#authButton'),
    closeSignInButton: document.querySelector('#signin_close'),
    submitSignInButton: document.querySelector('#submit-signin'),
    switchSignUpButton: document.querySelector('#signupButton'),
    errorEmail: document.querySelector("#error-signin_email"),
    errorPassword: document.querySelector("#error-signin_password"),
    popupSwitch: document.querySelector('#dialog_signup_block'),
    messageError: document.querySelector('#error-message-signin')
  }

  const popupSignUpParams = {
    popupSignUp: document.querySelector('#dialog_signup_block'),
    popupSuccess: document.querySelector('#dialog_success_block'),
    formSignUp: document.forms.signup,
    openSignUpButton: document.querySelector('#signupButton'),
    closeSignUpButton: document.querySelector('#signup_close'),
    submitSignUpButton: document.querySelector('#submit-signup'),
    switchSignInButton: document.querySelector('#signinButton'),
    errorEmail: document.querySelector("#error-signup_email"),
    errorPassword: document.querySelector("#error-signup_password"),
    errorName: document.querySelector("#error-signup_name"),
    popupSwitch: document.querySelector('#dialog_signin_block'),
    messageError: document.querySelector('#error-message-signup')
  }

  const popupSuccessParams = {
    popupSuccess: document.querySelector('#dialog_success_block'),
    closeSuccessButton: document.querySelector('#success_close'),
    switchSignInButton: document.querySelector('#successButton'),
    popupSwitch: document.querySelector('#dialog_signin_block')
  }

// console.log(Config.BACKEND_API_HOST);

const mainApi = new MainApiClient({
  host: Config.BACKEND_API_HOST,
  httpClient: HttpClient.create(),
});

const newsApi = NewsApiClient.create({
  apiKey: Config.NEWS_API_TOKEN,
  language: Config.NEWS_API_LANGUAGE,
  httpClient: HttpClient.create(),
});

// const user = new User();

const menu = new Menu();

const cardsContainer = document.getElementById('cards');

const cardsList = new CardList(cardsContainer);

const article = new Card(mainApi);

let newsCards = [];

let counter = 0;

function searchNews(text) {
  const searchText = (text || '').trim();

/*
  if (searchText.length === 0) {
    Dialog.show('dialog_error', Config.ERROR_TXT_NO_BLANK_ALLOWED);
    return;
  }
*/
  menu.disableNewsSearchButton();
  // newsCards = [];

  while(cardsContainer.firstChild){
    cardsContainer.removeChild(cardsContainer.firstChild);
  }

  menu.showLoadingSection();
  menu.hideSearchResultSection();
  menu.hideNoResultSection();

  newsApi.search(searchText).then((response) => {
    if (response.status === NewsApiClient.RESULT_STATUS_OK) {
      menu.hideLoadingSection();

      if (response.totalResults === 0) {
        menu.showNoResultSection();
      } else {
        menu.showSearchResultSection();
      }

      console.log(response);

        newsCards = response.articles.map((article) => {
          return {
            articleId: UuidGenerator.generate(),
            keyword: searchText,
            title: article.title,
            text: article.description,
            date: DateConverter.formatDate(article.publishedAt),
            source: article.source.name,
            link: article.url,
            image: article.urlToImage,
          }
        });

        console.log(newsCards);

        counter = 0;

        const partCards = newsCards.slice(counter, 3);

        if (newsCards.length > 3) {
          menu.showMoreButton();
        }

        cardsList.render(partCards);
        counter = 3;

      /*
      cards.Store.setRecords(response, (article) => Record
        .create(
          cards.Store.RecordDefinition,
          { ...article, ...{ keyword: text } },
          UuidGenerator.generate(),
        ));

      cards.refresh();
      */
    }

    menu.enableNewsSearchButton();
  },  () => {

    console.log('search error!');
    // Dialog.show('dialog_error', Config.ERROR_TXT_REQUEST_NOT_COMPLETED);
    // Element.wrap(Component.get('newsSearchButton').HtmlElement).enable();
  });
}


//document.getElementById('newsSearchText').getValue
document.getElementById('newsSearchButton').addEventListener('click', function () {
  searchNews(document.getElementById('newsSearchText').value);
});

document.getElementById('moreButton').addEventListener('click', function () {

  // console.log(newsCards);

  const newCounter = counter + 3;

  const partCards = newsCards.slice(counter, newCounter);

  if (newsCards.length - counter < 3) menu.hideMoreButton();

  cardsList.render(partCards);
  counter = newCounter;

});

document.getElementById('cards').addEventListener('click', function () {

  switch (event.target.className) {
    case 'icon icon_card icon_size_40 icon_save_normal':
      // console.log('save normal!');

      const origId = event.target.closest('.card').id;

      let cardObject = newsCards.find(item => item.articleId == origId);

      // const newId =
      article.save(cardObject, event.target, newsCards);

      console.log(newsCards);
/*
      cardObject.articleId = newId;

      const nCards = newsCards.map(item => {
        if (item.id === origId) return cardObject;
        else return item;
      });

      console.log(newId);
      console.log(nCards);

*/
      // event.target.classList.remove('icon_save_normal');
      // event.target.classList.add('icon_save_marked');

      break;
    case 'icon icon_card icon_size_40 icon_save_marked':
        // console.log('save marked!');

      // article.

        event.target.classList.remove('icon_save_marked');
      event.target.classList.add('icon_save_normal');
      break;
  }

  console.log(event.target.closest('.card').id);
  //  console.log(event.target.className);


});

menu.enableNewsSearchButton();

/**
 * Search button

Button.create({
  id: 'newsSearchButton',
  container: '.search__button',
  text: 'Искать',
  classList: ['btn', 'btn_style_primary', 'btn_size_m', 'btn_rad_100', 'btn_brd_none'],
  listeners: {
    click: () => {
      searchNews(Component.get('newsSearchText').getValue());
    },
  },
});

*/

/**
 * Search text

TextField.create({
  id: 'newsSearchText',
  container: '.search__textbox',
  placeholder: 'Введите тему новости',
  classList: ['textfield', 'textfield_size_m', 'textfield_brd_none'],
  listeners: {
    keypress: (event) => {
      if (event.domEvent.keyCode === 13) {
        searchNews(event.component.getValue());
      }
    },
  },
});
*/

// console.log(mainApi.getUserInfo('sdhgdhnrtynrty'));

//  const mainApi = null;
  /*
  new MainApi({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      // А чем content-type провинился?)))
      authorization: '3a29d4af-5c13-4fe8-ae79-6f88e9b7cc60'//,
      //'Content-Type': 'application/json'
    }
  });
*/



  const popupSignInValidator = new FormValidator(document.forms.signin);

  const popupSignIn = new PopupSignIn(popupSignInValidator, popupSignInParams, mainApi, menu);
  popupSignIn.setListeners();

  const popupSignUpValidator = new FormValidator(document.forms.signup);

  const popupSignUp = new PopupSignUp(popupSignUpValidator, popupSignUpParams, mainApi);
  popupSignUp.setListeners();

  const popupSuccess = new PopupSuccess(popupSuccessParams);
  popupSuccess.setListeners();

})();
