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

// ------------------------------ Переменные ------------------------------- //

// переменная для хранения открытого попапа
let popup;

// -------------------- Формы и всё что с ними сязано ---------------------- //

// -------------------- Форма "Редактировать профиль" ---------------------- //
// сама форма
const formElement = document.querySelector('[name="edit-profile"]');

// поле Имя
const nameInput = formElement.querySelector('[name="name"]');

// поле Работа 
const jobInput = formElement.querySelector('[name="description"]');

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


// ------------------------------- Функции --------------------------------- //

// @todo: Функция создания карточки
function addCard(data, del, like, open) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__image').alt = data.name;
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', del);
  card.querySelector('.card__like-button').addEventListener('click', like);
  card.querySelector('.card__image').addEventListener('click', open);
  return card;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}

// функция Like карточки
function likeCard (evt) {
   evt.target.classList.toggle('card__like-button_is-active');
}

// функция закрытия попапа
function closePopup() {
  document.removeEventListener('keydown', closeEscape);
  popup.removeEventListener('mousedown', closeOverlay);
  popup.classList.remove('popup_is-opened');
}

// функция закрытия попапа по нажатию Escape
function closeEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

// функция закрытия попапа по клику на Overlay
function closeOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();  
  }
}

// функция открытия попапа
function openPopup() {
  document.addEventListener('keydown', closeEscape);
  popup.addEventListener('mousedown', closeOverlay);
  popup.classList.add('popup_is-opened');
}

// функция открытия попапа с картинкой
function openImage (evt) {
  popup = imagePopup;
  popup.querySelector('.popup__image').src = evt.target.src;
  popup.querySelector('.popup__image').alt = evt.target.alt;
  popup.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup();
}

// колбэк кнопки Сохранить, формы "Редактировать профиль"
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

// колбэк кнопки Сохранить, формы "Новое место"
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  
  const newObject = {};
  newObject.name = placeInput.value;
  newObject.link = linkInput.value;
  
  initialCards.unshift(newObject);
  placesList.prepend(addCard(newObject, removeCard, likeCard, openImage));

  placeInput.value = '';
  linkInput.value = '';
  closePopup();
}


// --------------------------------- Code ---------------------------------- //

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, removeCard, likeCard, openImage));
});

// обработчик клика по кнопке Редактировать
editButton.addEventListener('click', function() {
  popup = editPopup;
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup();
});

// обработчик клика по кнопке + (Добавить)
addButton.addEventListener('click', function() {
  popup = addPopup;
  openPopup();
});

// обработчик клика кнопки Закрыть(Х) всех попапов
document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup();
  }
});

// обработчик кнопки Сохранить, формы "Редактировать профиль"
formElement.addEventListener('submit', handleFormSubmit);

//обработчик кнопки Сохранить, формы "Новое место"
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);