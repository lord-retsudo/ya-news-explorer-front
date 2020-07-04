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
      this.api.signup(this.formPopup.elements.names.value, this.formPopup.elements.email.value, this.formPopup.elements.password.value)
        .then(() => {
          console.log("Signup success!");
          this.close();
          this.popupSuccess.classList.add('dialog_is-opened');
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
    this.validator.resetError(this.errorName);
  }

}