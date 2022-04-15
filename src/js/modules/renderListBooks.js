import {getBooks, getLabels, API_URI} from "./serviceBook.js";

const libraryList = document.querySelector('.library__list');
const libraryCount = document.querySelector('.library__count');

const declOfNum = (n, titles) => n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

const getStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img src="./img/star.svg" alt="Рейтинг ${rating} из 5" class="card__rating-star">`);
    } else if (i < rating) {
      stars.push(`<img src="./img/star.svg" alt="" class="card__rating-star">`);
    } else {
      stars.push(`<img src="./img/star-o.svg" alt="" class="card__rating-star">`);
    }
  }
  return stars;
};

export const renderListBooks = async () => {
  const [books, labels] = await Promise.all([getBooks(), getLabels()]);
  libraryCount.textContent = declOfNum(books.length, ['книга', 'книги', 'книг']);

  libraryList.textContent = '';

  books.forEach(({author, description, id, image, label, rating, title}) => {
    const item = document.createElement('li');
    item.classList.add('library__item');
    item.innerHTML = `
      <a href="./#/book?id=${id}">
        <article class="card">
          <div class="card__wrapper">
            <img class="card__image" src="${API_URI}/${image}" alt="Обложка книги ${title}">

            <p class="card__label">${labels[label]}</p>
          </div>

          <div class="card__content">
            <h3 class="card__title">${title}</h3>

            <p class="card__author">${author}</p>

            <p class="card__description">${description.substring(0, 80)}...</p>

            <div class="card__rating">
              ${getStars(rating).join('')}
            </div>
          </div>
        </article>
      </a>
    `;
    libraryList.append(item);
  });
};
