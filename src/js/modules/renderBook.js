import {getBooks, getLabels, API_URI, delBooks} from "./serviceBook.js";
import {router} from "./router.js";

const bookContainer = document.querySelector('.book__container');
const btnDelete = document.querySelector('.header__btn-delete');
const footerBookLabel = document.querySelector('.footer__btn.book__label');

btnDelete.addEventListener('click', async () => {
  await delBooks(btnDelete.dataset.id);
  router.navigate('/');
});

const getStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img src="./img/star.svg" alt="Рейтинг ${rating} из 5" class="book__rating-star">`);
    } else if (i < rating) {
      stars.push(`<img src="./img/star.svg" alt="" class="book__rating-star">`);
    } else {
      stars.push(`<img src="./img/star-o.svg" alt="" class="book__rating-star">`);
    }
  }
  return stars;
};

export const renderBook = async (id) => {
  bookContainer.textContent = '';

  const [book, labels] = await Promise.all([getBooks(id), getLabels()]);
  const {author, description, image, label, rating, title} = book;
  const btnLabel = document.createElement('button');
  btnLabel.className = 'book__label book__label_img';
  btnLabel.textContent = labels[label];
  btnLabel.dataset.label = label;

  bookContainer.innerHTML = `
    <div class="book__wrapper">
      <img class="book__image" src="${API_URI}/${image}" alt="Обложка книги ${title}">

      ${btnLabel.outerHTML}
    </div>

    <div class="book__content">
      <h2 class="book__title">${title}</h2>

      <p class="book__author">${author}</p>

      <div class="book__rating">
        ${getStars(rating).join('')}
      </div>

      <p class="book__subtitle">Описание</p>

      <p class="book__description">${description}</p>
    </div>
  `;

  btnDelete.dataset.id = id;
  footerBookLabel.dataset.label = label;
  footerBookLabel.textContent = labels[label];
}
