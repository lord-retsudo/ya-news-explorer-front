import User from '../user/user';

export default class PopupSignIn {
  constructor(validator, popupParams, api, menu) {

    this.popup = popupParams.popupSignIn;
    this.formPopup = popupParams.formSignIn;
    this.mobileMenuLogged = popupParams.mobileMenuLogged;
    this.openPopupButton = popupParams.openSignInButton;
    this.openPopupButtonMobile = popupParams.openSignInButtonMobile;
    this.closePopupButton = popupParams.closeSignInButton;
    this.submitPopupButton = popupParams.submitSignInButton;
    this.switchPopupButton = popupParams.switchSignUpButton;
    this.errorEmail = popupParams.errorEmail;
    this.errorPassword = popupParams.errorPassword;
    this.popupSwitch = popupParams.popupSwitch;
    this.message = popupParams.messageError;
    this.validator = validator;
    this.validator.setEventListeners(true);
    this.api = api;
    this.menu = menu;
  }

  setListeners() {

    this.openPopupButton.addEventListener('click', function () {
      this.open();
    }.bind(this));

    this.openPopupButtonMobile.addEventListener('click', function () {
      this.open();
    }.bind(this));

    this.closePopupButton.addEventListener('click', function () {
      this.close();
    }.bind(this));

    this.switchPopupButton.addEventListener('click', function () {
      this.close();
      this.popupSwitch.classList.add('dialog_is-opened');
    }.bind(this));

    this.formPopup.addEventListener('submit', function (event) {

      event.preventDefault();
      this.api.signin(this.formPopup.elements.email.value, this.formPopup.elements.password.value)
        .then((response) => {
          this.api.getUserInfo(response.token).then((userInfo) => {
            User.login(userInfo.data.name, userInfo.data.email, response.token);
            this.formPopup.reset();
            this.close();
            this.menu.switchToLoggedMenu(User.getName());
            this.menu.switchToMobileLoggedMenu(User.getName());
            this.mobileMenuLogged.style.display = 'none';
          });
        })
        .catch((error) => {
          this.message.classList.remove('form__invalid-message_visibility_hidden');
          this.message.classList.add('form__invalid-message_visibility_shown');
        });
    }.bind(this));
  }

  open() {
    this.popup.classList.add('dialog_is-opened');
  }

  close() {
    this.popup.classList.remove('dialog_is-opened');
    this.formPopup.reset();
    this.validator.resetError(this.errorEmail);
    this.validator.resetError(this.errorPassword);
  }
}