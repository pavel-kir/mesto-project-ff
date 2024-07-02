// функция закрытия попапа по нажатию Escape
function closeEscape (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

// функция закрытия попапа по клику на Overlay
function closeOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal();  
  }
}

// функция закрытия попапа для Escape и Overlay и кнопки Х
export function closeModal() {
  const openModal = document.querySelector('.popup_is-opened');
  document.removeEventListener('keydown', closeEscape);
  openModal.removeEventListener('mousedown', closeOverlay);
  openModal.classList.remove('popup_is-opened');

}

// функция закрытия попапа
export function closePopup(popup) {
  document.removeEventListener('keydown', closeEscape);
  popup.removeEventListener('mousedown', closeOverlay);
  popup.classList.remove('popup_is-opened');
}

// функция открытия попапа
export function openPopup(popup) {
  document.addEventListener('keydown', closeEscape);
  popup.addEventListener('mousedown', closeOverlay);
  popup.classList.add('popup_is-opened');
}