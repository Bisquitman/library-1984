import {getBooks, getLabels, API_URI} from "./serviceBook.js";
import {declOfNum} from "./declOfNum.js";

export const data = {
  books: [],
  labels: [],
  sortBooks(sort) {
    return this.books.sort((a, b) => {
      if (sort === 'up') return a.rating > b.rating ? 1 : -1;
      if (sort === 'down') return a.rating < b.rating ? 1 : -1;
    });
  },
  filterBooks(value) {
    return this.books.filter(book => book.label === value)
  }
};

const libraryList = document.querySelector('.library__list');
const libraryCount = document.querySelector('.library__count');
const fieldsList = document.querySelector('.fields__list_filter');

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

export const renderList = (books = data.books) => {
  libraryList.textContent = '';
  libraryCount.textContent = declOfNum(books.length, ['книга', 'книги', 'книг']);

  const items = books.map(({author, description, id, image, label, rating, title}) => {
    const item = document.createElement('li');
    item.classList.add('library__item');
    item.innerHTML = `
      <a href="/#/book?id=${id}">
        <article class="card">
          <div class="card__wrapper">
            <img class="card__image" src="${API_URI}/${image}" alt="Обложка книги ${title}">

            <p class="card__label">${data.labels[label]}</p>
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
    return item;
  });
  libraryList.append(...items);
};

const renderFields = (labels) => {
  fieldsList.textContent = '';
  for (const key in labels) {
    const item = document.createElement('li');
    item.className = 'fields__item';

    const button = document.createElement('button');
    button.className = 'fields__btn';
    button.dataset.filter = key;
    button.textContent = labels[key];

    item.append(button);
    fieldsList.append(item);
  }
};

export const renderListBooks = async () => {
  const [books, labels] = await Promise.all([getBooks(), getLabels()]);

  data.books = books;
  data.labels = labels;

  renderList(books);
  renderFields(labels);
};
