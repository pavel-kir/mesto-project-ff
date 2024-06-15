// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(data, funDelete) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', funDelete);
  return card;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, removeCard));
});