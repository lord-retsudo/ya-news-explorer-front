export default class PopupSignIn {
  constructor(validator, popupParams, api, user, menu) {

    this.popup = popupParams.popupSignIn;
    this.formPopup = popupParams.formSignIn;
    this.openPopupButton = popupParams.openSignInButton;
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
    this.user = user;
    this.menu = menu;
    // console.log(this.api.getUserInfo('sdhgdhnrtynrty'));

  }

  setListeners() {
    // Можно лучше
    // обработчки событий лучше сделать отдельными методами класса
    // а в этой функции лишь назначать их событиям, так проще читать код
    // и понимать его структуру. Назначать лучше через стрелочные функции.
    // Аналогично лучше исправить на будущее и в других классах.
    this.openPopupButton.addEventListener('click', function () {

      this.open();
      // this.validator.setSubmitButtonState(this.submitPopupButton, true);
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

      // this.formPopup.reset();
      // this.close();



      this.api.signin(this.formPopup.elements.email.value, this.formPopup.elements.password.value)
        .then((response) => {
          this.api.getUserInfo(response.token).then((userInfo) => {
            this.user.login(userInfo.data.name, userInfo.data.email, response.token);
            this.formPopup.reset();
            this.close();
            this.menu.switchToLoggedMenu(this.user.getName());

            // console.log(this.user.getToken());
          });
        })
        .catch((error) => {

          console.log(error);

          this.message.classList.remove('form__invalid-message_visibility_hidden');
          this.message.classList.add('form__invalid-message_visibility_shown');
/*
          if (error instanceof HttpRequestError) {
            MsgBox.error('Ошибка авторизации');
          } else {
            error.Response.json().then((errorBody) => {
              Dialog.show('dialog_error', errorBody.message.replace(/&quot;/g, '"'));
            });
          }
      */
        });



/*
      this.api.sendUserInfo(this.formProfile.elements.name.value, this.formProfile.elements.about.value)
        .then((result) => {
          this.userInfo.updateUserInfo(result);
          this.formProfile.reset();
          this.close();
        })
        .catch((err) => {
          console.log('ошибка передачи данных на сервер: ' + err);
        });
*/
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