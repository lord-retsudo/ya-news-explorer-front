export default class PopupSignIn {
  constructor(validator, popupParams, api) {    
 
    this.popup = popupParams.popupSignIn;
    this.formPopup = popupParams.formSignIn;
    this.openPopupButton = popupParams.openSignInButton;
    this.closePopupButton = popupParams.closeSignInButton;
    this.submitPopupButton = popupParams.submitSignInButton;
    this.errorEmail = popupParams.errorEmail;
    this.errorPassword = popupParams.errorPassword;

    this.validator = validator;
    this.validator.setEventListeners(true);    
    this.api = api;
  }

  setListeners() {
    // Можно лучше
    // обработчки событий лучше сделать отдельными методами класса
    // а в этой функции лишь назначать их событиям, так проще читать код
    // и понимать его структуру. Назначать лучше через стрелочные функции.
    // Аналогично лучше исправить на будущее и в других классах.
    this.openPopupButton.addEventListener('click', function () {
      
      this.open();      
      this.validator.setSubmitButtonState(this.submitPopupButton, true);
    }.bind(this));

    this.closePopupButton.addEventListener('click', function () {

      this.formPopup.reset();
      this.close();
      this.validator.resetError(this.errorEmail);
      this.validator.resetError(this.errorPassword);
    }.bind(this));

    this.formPopup.addEventListener('submit', function (event) {
      event.preventDefault();
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
  }

}