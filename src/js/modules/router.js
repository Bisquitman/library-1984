import Navigo from 'navigo';
import {renderListBooks} from './renderListBooks.js';
import {renderBook} from "./renderBook.js";

export const router = new Navigo(location.pathname, {
  hash: true,
});

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn');
const backBtn = document.querySelector('.book__btn-back');

const closeAllPages = () => {
  library.classList.add('hide');
  book.classList.add('hide');
  add.classList.add('hide');
};

export const initRouter = () => {

  router.on({
    '/': () => {
      closeAllPages();
      library.classList.remove('hide');
      document.body.classList.remove('body_gradient');
      renderListBooks();
    },
    'book': ({params: {id}}) => {
      closeAllPages();
      book.classList.remove('hide');
      document.body.classList.add('body_gradient');
      renderBook(id);
    },
    'add': () => {
      closeAllPages();
      add.classList.remove('hide');
      document.body.classList.add('body_gradient');
    },
  }).resolve();

  addBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate('add');
    });
  });

  backBtn.addEventListener('click', () => {
    router.navigate('/');
  });
};
