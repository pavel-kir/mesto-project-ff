// @todo: Функция создания карточки
export function addCard(data, template, del, like, open) {
  const card = template.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__image').alt = data.name;
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', del);
  card.querySelector('.card__like-button').addEventListener('click', like);
  card.querySelector('.card__image').addEventListener('click', open);
  return card;
}

// @todo: Функция удаления карточки
export function removeCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}

// функция Like карточки
export function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}