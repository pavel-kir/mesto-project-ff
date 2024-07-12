// функция проверки валидности всех полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция изменения кнопки submit в зависимости от валидности полей формы 
const toggleButtonState = (inputList, buttonElement, objectConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(objectConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// функция очистки значений прошлой валидации
export const clearValidation = (formElement, objectConfig) => {
  const buttonElement = formElement.querySelector(objectConfig.submitButtonSelector);

  buttonElement.classList.add(objectConfig.inactiveButtonClass);
  buttonElement.disabled = true;

  formElement.querySelectorAll(objectConfig.inputSelector).forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement, objectConfig);  
  });
};

// функция показывает сообщение, если поле невалидно
const showInputError = (formElement, inputElement, errorMessage, objectConfig) => {
  const errorElement = formElement.querySelector(`.popup__${inputElement.name}-error`);
  inputElement.classList.add(objectConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectConfig.errorClass);
};

// функция скрывает ссобщение о невалидности поля
const hideInputError = (formElement, inputElement, objectConfig) => {
  const errorElement = formElement.querySelector(`.popup__${inputElement.name}-error`);
  inputElement.classList.remove(objectConfig.inputErrorClass);
  errorElement.classList.remove(objectConfig.errorClass);
};

// функция проверки валидности поля
const checkInputValidity = (formElement, inputElement, objectConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectConfig);
  } else {
    hideInputError(formElement, inputElement, objectConfig);
  }
};

// функция включения валидации
export const enableValidation = (objectConfig) => {
  document.querySelectorAll(objectConfig.formSelector).forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(objectConfig.inputSelector));
    const buttonElement = formElement.querySelector(objectConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, objectConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, objectConfig);
        toggleButtonState(inputList, buttonElement, objectConfig);
      });
    });
  });
};