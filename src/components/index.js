// -------------------------------- Import --------------------------------- //

import '../pages/index.css';

import { initialCards } from "../components/cards";
import { addCard, removeCard, likeCard } from "../components/card";
import { openPopup, closePopup, closeOverlay} from "../components/modal";
import { enableValidation, clearValidation } from '../components/validation';

// --------------------------------- ПР5 ----------------------------------- //

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// -------------------------------- Кнопки --------------------------------- //

// кнопка Редактировать
const editButton = document.querySelector('.profile__edit-button');

// кнопка Добавить(+)
const addButton = document.querySelector('.profile__add-button');

// -------------------------------- Попапы --------------------------------- //

// попап Редактировать
const editPopup = document.querySelector('.popup_type_edit');

// попап Добавить
const addPopup = document.querySelector('.popup_type_new-card');

// попап картинки
const imagePopup = document.querySelector('.popup_type_image');

// -------------------- Формы и всё что с ними сязано ---------------------- //

// -------------------- Форма "Редактировать профиль" ---------------------- //
// сама форма
const formProfile = document.querySelector('[name="edit-profile"]');

// поле Имя
const nameInput = formProfile.querySelector('[name="name"]');

// поле Работа 
const jobInput = formProfile.querySelector('[name="description"]');

// элемент на странице, отображающий Имя
const profileTitle = document.querySelector('.profile__title');

// элемент на странице, отображающий кем работает человек
const profileDescription = document.querySelector('.profile__description');

// ------------------------- Форма "Новое место" --------------------------- //
// сама форма
const formNewPlace = document.querySelector('[name="new-place"]');

// поле Название
const placeInput = formNewPlace.querySelector('[name="place-name"]');

// поле Ссылка
const linkInput = formNewPlace.querySelector('[name="link"]');

// ------------------------------ Переменные ------------------------------- //

// Объект настроек для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


// ------------------------------- Функции --------------------------------- //

// функция открытия попапа с картинкой
function openImage (evt) {
  imagePopup.querySelector('.popup__image').src = evt.target.src;
  imagePopup.querySelector('.popup__image').alt = evt.target.alt;
  imagePopup.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(imagePopup);
}

// колбэк кнопки Сохранить, формы "Редактировать профиль"
function submitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

// колбэк кнопки Сохранить, формы "Новое место"
function submitNewPlace(evt) {
  evt.preventDefault();
  
  const newObject = {};
  newObject.name = placeInput.value;
  newObject.link = linkInput.value;
  
  initialCards.unshift(newObject);
  placesList.prepend(addCard(newObject, cardTemplate, removeCard, likeCard, openImage));

  placeInput.value = '';
  linkInput.value = '';
  closePopup(addPopup);
  clearValidation(formNewPlace, validationConfig);
}


// --------------------------------- Code ---------------------------------- //

// добавления обработчика клика на каждый popup
document.querySelectorAll('.popup').forEach((item) => {
  item.addEventListener('click', closeOverlay);
});

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, cardTemplate, removeCard, likeCard, openImage));
});

// обработчик клика по кнопке Редактировать
editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formProfile, validationConfig);
  openPopup(editPopup);
});

// обработчик клика по кнопке + (Добавить)
addButton.addEventListener('click', function() {
  openPopup(addPopup);
});

// обработчик кнопки Сохранить, формы "Редактировать профиль"
formProfile.addEventListener('submit', submitProfile);

//обработчик кнопки Сохранить, формы "Новое место"
formNewPlace.addEventListener('submit', submitNewPlace);

// включение валидации
enableValidation(validationConfig); 