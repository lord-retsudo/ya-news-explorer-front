export default class FormValidator {
    constructor(form) {
        this.form = form;
    }

    checkInputValidity(elementInput, elementError){
        if (elementInput.type === 'email' && !elementInput.checkValidity()){
            elementError.classList.add('form__invalid-message_visibility_shown');
            elementError.textContent = 'Здесь должен быть валидный email';
            return false;
          }

          if (elementInput.validity.valueMissing) {
            elementError.classList.add('form__invalid-message_visibility_shown');
            elementError.textContent = 'Это обязательное поле';
            return false;
          }

          if (elementInput.validity.tooShort || elementInput.validity.tooLong) {
            elementError.classList.add('form__invalid-message_visibility_shown');
            elementError.textContent = 'Должно быть от 7 до 20 символов';
            return false;
          }

          this.resetError(elementError);

          return true;
    }

    setSubmitButtonState(element, state) {

     // console.log(element);

        if(state) {
          element.removeAttribute('disabled');
          // element.classList.add('popup__button_enabled');
        }
        else {
         element.setAttribute('disabled', true);
         // element.classList.remove('popup__button_enabled');
        }

    }

    setEventListeners(state) {

        const inputs = Array.from(this.form.querySelectorAll('input'));
        const inputsStates = new Map();

        inputs.forEach((element) => inputsStates.set(element.id, state));

        this.form.addEventListener('input', function(event) {

          const id = event.target.id;
          const errorElement = document.querySelector(`#error-${id}`);
          const submitButton = document.querySelector(`#submit-${this.form.name}`);

          // console.log(submitButton);

          this.checkInputValidity(event.target, errorElement) ? inputsStates.set(id, true) : inputsStates.set(id, false);

          Array.from(inputsStates.values()).every((value) => value) ? this.setSubmitButtonState(submitButton, true) : this.setSubmitButtonState(submitButton, false);
        }.bind(this));
    }

    resetError(element){
      element.classList.remove('form__invalid-message_visibility_shown');
      element.classList.add('form__invalid-message_visibility_hidden');
      element.textContent = '&nbsp;';
    }
}