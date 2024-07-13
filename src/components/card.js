
import { deleteCard, putLike, deleteLike } from "./api";

// @todo: Функция создания карточки
export function addCard(data, template, del, like, open, user_id) {
  const card = template.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const image = card.querySelector('.card__image');

  // id
  card.id = data._id;

  // картинка
  image.src = data.link;
  image.alt = data.name;
  image.addEventListener('click', open);

  // название
  card.querySelector('.card__title').textContent = data.name;

  // количество лайков
  card.querySelector('.card__like-counter').textContent = data.likes.length;

  // слушатель на кнопку like
  likeButton.addEventListener('click', like);
  
  // если мы лайкали карточку, меняем цвет кнопки
  if (data.likes.length > 0) {
    if (data.likes.some( item => item._id === user_id)) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }
  
  // если мы добавляли карточку, устанавливаем кнопку удаления
  if (user_id === data.owner._id) {
    deleteButton.addEventListener('click', del);
    deleteButton.classList.add('card__delete-button_visible');
  }

  return card;
}

// @todo: Функция удаления карточки
export function removeCard(evt) {
  const listItem = evt.target.closest('.card');

  deleteCard(listItem.id)
    .then(() => listItem.remove())

    .catch(err => console.log(err));
}

// функция Like карточки
export function likeCard (evt) {
  const listItem = evt.target.closest('.card')

  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLike(listItem.id)
      .then((res) => {
        listItem.querySelector('.card__like-counter').textContent = res.likes.length;
        evt.target.classList.remove('card__like-button_is-active');
      })
      .catch(err => console.log(err));
  } else {
    putLike(listItem.id)
      .then((res) => {
        listItem.querySelector('.card__like-counter').textContent = res.likes.length;
        evt.target.classList.add('card__like-button_is-active');
      })
      
      .catch(err => console.log(err));
  }
}
