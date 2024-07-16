// -------------------------------- Import --------------------------------- //

import '../pages/index.css';

import { addCard, likeCard } from "../components/card";
import { openPopup, closePopup, closeOverlay} from "../components/modal";
import { enableValidation, clearValidation } from '../components/validation';
import { getInitialUser, getInitialCards, patchEditProfile, postNewCard, patchUpdateAvatar, headValidUrl, deleteCard } from '../components/api';

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

// кнопка Обновить аватар
const updateButton = document.querySelector('.profile__image');

// -------------------------------- Попапы --------------------------------- //

// попап Редактировать
const editPopup = document.querySelector('.popup_type_edit');

// попап Добавить
const addPopup = document.querySelector('.popup_type_new-card');

// попап картинки
const imagePopup = document.querySelector('.popup_type_image');

// попап Обновить аватар
const updatePopup = document.querySelector('.popup_type_update-avatar');

// попап Подтверждения удаления
const deletePopup = document.querySelector('.popup_type_question-delete');

// -------------------------------- Формы ---------------------------------- //

// -------------------- Форма "Редактировать профиль" ---------------------- //
// сама форма
const formProfile = editPopup.querySelector('.popup__form');

// поле Имя
const nameInput = formProfile.querySelector('[name="name"]');

// поле Работа 
const jobInput = formProfile.querySelector('[name="description"]');


// ------------------------- Форма "Новое место" --------------------------- //
// сама форма
const formNewPlace = addPopup.querySelector('.popup__form');

// поле Название
const placeInput = formNewPlace.querySelector('[name="place-name"]');

// поле Ссылка
const linkInput = formNewPlace.querySelector('[name="link"]');

// ------------------------Форма "Обновить аватар" ------------------------- //

// сама форма
const formUpdateAvatar = updatePopup.querySelector('.popup__form');

// поле Ссылка
const updateInput = formUpdateAvatar.querySelector('[name="link-update"]');

// -------------------- Форма "Подтверждение удаления" --------------------- //
const formQestion = deletePopup.querySelector('.popup__form');

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

// элемент на странице, отображающий Имя
const profileTitle = document.querySelector('.profile__title');

// элемент на странице, отображающий кем работает человек
const profileDescription = document.querySelector('.profile__description');

// элемент на странице, отображающий фото профиля
const profileImage = document.querySelector('.profile__image');

// переменная для хранения id карточки
let  id;

// переменная для хранения удаляемой карточки
let card;


// ------------------------------- Функции --------------------------------- //

// функция открытия попапа с картинкой
function openImage (evt) {
  imagePopup.querySelector('.popup__image').src = evt.target.src;
  imagePopup.querySelector('.popup__image').alt = evt.target.alt;
  imagePopup.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(imagePopup);
}

// функция удаления карточки
function removeCard(cardId, deletion) {
  id = cardId;
  card = deletion;
  openPopup(deletePopup);
}

// Колбэк кнопки Да, формы "Подтверждение удаления"
function submitQestion (evt) {
  evt.preventDefault(); 
  deleteCard(id)
    .then(() => card.remove())
    .catch(err => console.log(err))
    .finally(() => closePopup(deletePopup));
}

// колбэк кнопки Сохранить, формы "Редактировать профиль"
function submitProfile(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  
  patchEditProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })

    .catch(err => console.log(err))

    .finally(() => {
      saveButton.textContent = 'Сохранить';
      closePopup(editPopup);
    });
  }

// колбэк кнопки Сохранить, формы "Новое место"
function submitNewPlace(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  postNewCard(placeInput.value, linkInput.value)
    .then((res) => {
      placesList.prepend(addCard(res, cardTemplate, likeCard, openImage, removeCard, res.owner._id));
    })

    .catch(err => console.log(err))

    .finally(() => {
      saveButton.textContent = 'Сохранить';
      placeInput.value = '';
      linkInput.value = '';
      closePopup(addPopup);
      clearValidation(formNewPlace, validationConfig);
    });
}

// колбэк кнопки Сохранить, формы "Обновить аватар"
function submitUpdateAvatar(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  headValidUrl(updateInput.value)
    .then((res) => {
      if (res.match(/^image/)) {
        patchUpdateAvatar(updateInput.value)
          .then((res) => {
            profileImage.src = res.avatar;
          })
          .catch(err => console.log(err))

      } else console.log('URL не прошёл проверку')
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
      closePopup(updatePopup);
    });
}


// --------------------------------- Code ---------------------------------- //

// добавления обработчика клика на каждый popup
document.querySelectorAll('.popup').forEach((item) => {
  item.addEventListener('click', closeOverlay);
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

// обработчик клика по изображению аватара
updateButton.addEventListener('click', function() {
  openPopup(updatePopup);
});

// обработчик кнопки Сохранить, формы "Редактировать профиль"
formProfile.addEventListener('submit', submitProfile);

//обработчик кнопки Сохранить, формы "Новое место"
formNewPlace.addEventListener('submit', submitNewPlace);

//обработчик кнопки Сохранить, формы "Обновить аватар"
formUpdateAvatar.addEventListener('submit', submitUpdateAvatar);

// обработчик кнопки Да, формы "Подтверждение удаления"
formQestion.addEventListener('submit', submitQestion);

// включение валидации
enableValidation(validationConfig); 

// Промис Инициализация пользователя и Вывод карточек с сервера
Promise.all([getInitialUser(), getInitialCards()])
  .then(([resultUser, resultCard]) => {
    profileTitle.textContent = resultUser.name;
    profileDescription.textContent = resultUser.about;
    profileImage.src = resultUser.avatar;

    resultCard.forEach((item) => {
      placesList.append(addCard(item, cardTemplate, likeCard, openImage, removeCard, resultUser._id));
    });
  })
  .catch(err => console.log(err));