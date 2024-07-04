// функция закрытия попапа по нажатию Escape
function closeEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

// функция закрытия попапа по клику на Overlay или кнопке X 
export function closeOverlay (evt) {
  if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close'))) {
    closePopup(evt.target.closest('.popup'));  
  }
}

// функция закрытия попапа
export function closePopup(popup) {
  document.removeEventListener('keydown', closeEscape);
  popup.classList.remove('popup_is-opened');
}

// функция открытия попапа
export function openPopup(popup) {
  document.addEventListener('keydown', closeEscape);
  popup.classList.add('popup_is-opened');
}