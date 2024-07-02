import { popup } from "../components/index.js";

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

// функция закрытия попапа
export function closePopup() {
  document.removeEventListener('keydown', closeEscape);
  popup.removeEventListener('mousedown', closeOverlay);
  popup.classList.remove('popup_is-opened');
}

// функция открытия попапа
export function openPopup() {
  document.addEventListener('keydown', closeEscape);
  popup.addEventListener('mousedown', closeOverlay);
  popup.classList.add('popup_is-opened');
}