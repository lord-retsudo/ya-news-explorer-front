import './styles.css';
import './images/favicon.png';

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

  const mobileMenuNotLogged = document.getElementById('mobileMenuNotLogged');
  const mobileMenuLogged = document.getElementById('mobileMenuLogged');
  const desktopMenuNotLogged = document.getElementById('desktopMenuNotLogged');
  const desktopMenuLogged = document.getElementById('desktopMenuLogged');

  const popupSignInParams = {
    popupSignIn: document.querySelector('#dialog_signin_block'),
    formSignIn: document.forms.signin,
    mobileMenuLogged: mobileMenuLogged,
    openSignInButton: document.querySelector("#authButton"),
    openSignInButtonMobile: document.querySelector("#authButtonMobile"),
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

const mainApi = new MainApiClient({
  host: Config.BACKEND_API_HOST,
  httpClient: HttpClient.create(),
});

const newsApi = NewsApiClient.create({
  apiKey: Config.NEWS_API_TOKEN,
  language: Config.NEWS_API_LANGUAGE,
  httpClient: HttpClient.create(),
});

const menu = new Menu();
const cardsContainer = document.getElementById('cards');
const cardsList = new CardList(cardsContainer);
const article = new Card(mainApi);

let newsCards = [];
let counter = 0;

function searchNews(text) {
  const searchText = (text || '').trim();

  menu.disableNewsSearchButton();
  menu.removeCards(cardsContainer);

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

      newsCards = response.articles.map((article) => {

        let imageLink = '/images/placeholder.png';
        if (article.urlToImage !== null) imageLink = article.urlToImage;

        return {
          articleId: UuidGenerator.generate(),
          keyword: searchText,
          title: article.title,
          text: article.description,
          date: DateConverter.formatDate(article.publishedAt),
          source: article.source.name,
          link: article.url,
          image: imageLink,
        }
      });

      counter = 0;
      const partCards = newsCards.slice(counter, 3);

      if (newsCards.length > 3) {
        menu.showMoreButton();
      }

      cardsList.render(partCards);
      counter = 3;
    }

    menu.enableNewsSearchButton();
  },  () => {

    alert(Config.ERROR_TXT_REQUEST_NOT_COMPLETED);
    menu.enableNewsSearchButton();
  });
}

document.getElementById('newsSearchButton').addEventListener('click', function () {

  const searchText = document.getElementById('newsSearchText').value;
  searchText !== '' ? searchNews(searchText) : alert(Config.ERROR_TXT_NO_BLANK_ALLOWED)
});

document.getElementById('moreButton').addEventListener('click', function () {

  const newCounter = counter + 3;
  const partCards = newsCards.slice(counter, newCounter);
  if (newsCards.length - counter < 3) menu.hideMoreButton();
  cardsList.render(partCards);
  counter = newCounter;
});

document.getElementById('cards').addEventListener('click', function () {

  const origId = event.target.closest('.card').id;

  switch (event.target.className) {
    case 'icon icon_card icon_size_40 icon_save_normal':
      if(!User.getName()) break;
      let cardObject = newsCards.find(item => item.articleId == origId);
      article.save(cardObject, event.target, newsCards);
      break;
    case 'icon icon_card icon_size_40 icon_save_marked':
      article.remove(origId, event.target);
      break;
  }
});

document.getElementById('cards').addEventListener('mouseover', function () {

  if(!User.getName()){
    const origId = event.target.closest('.card').id;
    if(event.target.closest('i').className = 'icon icon_card icon_size_40 icon_save_normal') document.getElementById('tooltip-'+origId).classList.remove('tooltip_notlogged');
  }

});

document.getElementById('cards').addEventListener('mouseout', function () {

  if(!User.getName()){
    const origId = event.target.closest('.card').id;
    if(event.target.closest('i').className = 'icon icon_card icon_size_40 icon_save_normal') document.getElementById('tooltip-'+origId).classList.add('tooltip_notlogged');
  }

});

document.getElementById('menuToggleButtonNotLogged').addEventListener('click', function () {

  if(mobileMenuNotLogged.style.display == 'flex'){
    mobileMenuNotLogged.style.display = 'none';
    desktopMenuNotLogged.style.backgroundColor = 'transparent';
  }
  else {
    mobileMenuNotLogged.style.display = 'flex';
    desktopMenuNotLogged.style.backgroundColor = '#1A1B22';
  }  
});

document.getElementById('menuToggleButtonLogged').addEventListener('click', function () {

  if(mobileMenuLogged.style.display == 'flex'){
    mobileMenuLogged.style.display = 'none';
    desktopMenuLogged.style.backgroundColor = 'transparent';
  }
  else {
    mobileMenuLogged.style.display = 'flex';
    desktopMenuLogged.style.backgroundColor = '#1A1B22';
  }  
});

window.addEventListener('resize', function () {
  mobileMenuNotLogged.style.display = 'none';
  mobileMenuLogged.style.display = 'none';
  desktopMenuNotLogged.style.backgroundColor = 'transparent';
  desktopMenuLogged.style.backgroundColor = 'transparent';
});


menu.enableNewsSearchButton();

const userName = User.getName();

if(userName) {
  menu.switchToLoggedMenu(userName);
  menu.switchToMobileLoggedMenu(userName);
  mobileMenuLogged.style.display = 'none';
}

const popupSignInValidator = new FormValidator(document.forms.signin);

const popupSignIn = new PopupSignIn(popupSignInValidator, popupSignInParams, mainApi, menu);
popupSignIn.setListeners();

const popupSignUpValidator = new FormValidator(document.forms.signup);

const popupSignUp = new PopupSignUp(popupSignUpValidator, popupSignUpParams, mainApi);
popupSignUp.setListeners();

const popupSuccess = new PopupSuccess(popupSuccessParams);
popupSuccess.setListeners();

})();
