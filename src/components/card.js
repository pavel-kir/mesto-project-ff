// @todo: Функция создания карточки
export function addCard(data, template, like, open, remove, delLike, putLike, user_id) {
  const card = template.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const image = card.querySelector('.card__image');

  // картинка
  image.src = data.link;
  image.alt = data.name;
  image.addEventListener('click', open);

  // название
  card.querySelector('.card__title').textContent = data.name;

  // количество лайков
  card.querySelector('.card__like-counter').textContent = data.likes.length;

  // слушатель на кнопку like
  likeButton.addEventListener('click', () => like(data._id, card, delLike, putLike));
  
  // если мы лайкали карточку, меняем цвет кнопки
  if (data.likes.length > 0) {
    if (data.likes.some( item => item._id === user_id)) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }
  
  // если мы добавляли карточку, устанавливаем кнопку удаления
  if (user_id === data.owner._id) {
    deleteButton.addEventListener('click', () => remove(data._id, card));
    deleteButton.classList.add('card__delete-button_visible');
  }

  return card;
}

// функция Like карточки
export function likeCard (id, listItem, deleteLike, putLike) {
  const likeButton = listItem.querySelector('.card__like-button');
  const likeCounter = listItem.querySelector('.card__like-counter');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(id)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch(err => console.log(err));
  } else {
    putLike(id)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      
      .catch(err => console.log(err));
  }
}
