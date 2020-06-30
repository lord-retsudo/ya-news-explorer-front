export default class PopupSignUp {
  constructor(validator, popupParams, api) {

    this.popup = popupParams.popupSignUp;
    this.formPopup = popupParams.formSignUp;
    this.openPopupButton = popupParams.openSignUpButton;
    this.closePopupButton = popupParams.closeSignUpButton;
    this.submitPopupButton = popupParams.submitSignUpButton;
    this.switchPopupButton = popupParams.switchSignInButton;
    this.popupSuccess = popupParams.popupSuccess;
    this.errorEmail = popupParams.errorEmail;
    this.errorPassword = popupParams.errorPassword;
    this.errorName = popupParams.errorName;
    this.popupSwitch = popupParams.popupSwitch;
    this.message = popupParams.messageError;
    this.validator = validator;
    this.validator.setEventListeners(true);
    this.api = api;
  }

  setListeners() {
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
      // this.close();


      this.api.signup(this.formPopup.elements.names.value, this.formPopup.elements.email.value, this.formPopup.elements.password.value)
        .then(() => {
          console.log("Signup success!");
          this.close();
          this.popupSuccess.classList.add('dialog_is-opened');
        })
        .catch((error) => {

          console.log("Signup error!");

          this.message.classList.remove('form__invalid-message_visibility_hidden');
          this.message.classList.add('form__invalid-message_visibility_shown');
/*
          if (error instanceof HttpRequestError) {
            MsgBox.error('Ошибка регистрации');
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
    this.validator.resetError(this.errorName);
  }

}