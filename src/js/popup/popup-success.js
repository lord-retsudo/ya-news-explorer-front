export default class PopupSuccess {
  constructor(popupParams) {

    this.popup = popupParams.popupSuccess;
    this.closePopupButton = popupParams.closeSuccessButton;
    this.switchPopupButton = popupParams.switchSignInButton;
    this.popupSwitch = popupParams.popupSwitch;
  }

  setListeners() {
    this.closePopupButton.addEventListener('click', function () {
      this.close();
    }.bind(this));

    this.switchPopupButton.addEventListener('click', function () {
      this.close();
      this.popupSwitch.classList.add('dialog_is-opened');
    }.bind(this));


  }

  open() {
    this.popup.classList.add('dialog_is-opened');
  }

  close() {
    this.popup.classList.remove('dialog_is-opened');
  }

}