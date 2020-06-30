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
import Config from './js/config';
import HttpClient from './js/http-client/http-client';
import HttpRequestError from './js/http-client/http-request-error';
import User from './js/user/user';

import FormValidator from './js/popup/formvalidator.js'
import PopupSignIn from './js/popup/popup-signin.js'
import PopupSignUp from './js/popup/popup-signup.js'
import PopupSuccess from './js/popup/popup-success.js'

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

 console.log(Config.BACKEND_API_HOST);

const mainApi = new MainApiClient({
  host: Config.BACKEND_API_HOST,
  httpClient: HttpClient.create(),
});

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

/*
  const objectUserInfo = new UserInfo(userInfoParams);

  api.getUserInfo()
    .then((result) => {
      objectUserInfo.initUserInfo(result);
    })
    .catch((err) => {
      console.log('ошибка передачи данных с сервера: ' + err);
    });

  const cardList = new CardList(placesList, popupImage);

  api.getInitialCards()
    .then((result) => {
      cardList.render(result);
    })
    .catch((err) => {
      console.log('ошибка передачи данных с сервера: ' + err);
    });

  const popupCard = new Card();
  const popupValidator = new FormValidator(document.forms.new);

  const popup = new Popup(cardList, popupCard, popupValidator, popupParams, api);
  popup.setListeners();

  const popupProfileValidator = new FormValidator(document.forms.profile);

  const popupProfile = new PopupProfile(popupProfileValidator, objectUserInfo, popupProfileParams, api);
  popupProfile.setListeners();
*/

  const popupSignInValidator = new FormValidator(document.forms.signin);

  const popupSignIn = new PopupSignIn(popupSignInValidator, popupSignInParams, mainApi);
  popupSignIn.setListeners();

  const popupSignUpValidator = new FormValidator(document.forms.signup);

  const popupSignUp = new PopupSignUp(popupSignUpValidator, popupSignUpParams, mainApi);
  popupSignUp.setListeners();

  const popupSuccess = new PopupSuccess(popupSuccessParams);
  popupSuccess.setListeners();

})();
