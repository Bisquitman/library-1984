import Navigo from 'navigo';

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn');
const backBtns = document.querySelectorAll('.header__btn-back');
const searchBtns = document.querySelectorAll('.header__btn-search');
const search = document.querySelector('.search');

const router = new Navigo('/', {
  hash: true,
});

const closeAllPages = () => {
  library.classList.add('hide');
  book.classList.add('hide');
  add.classList.add('hide');
  search.classList.remove('search_active');
};

router.on({
  '/': () => {
    closeAllPages();
    library.classList.remove('hide');
  },
  'book': () => {
    closeAllPages();
    book.classList.remove('hide');
  },
  'add': () => {
    closeAllPages();
    add.classList.remove('hide');
  },
}).resolve();

addBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('add');
  });
});

backBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/');
  });
});

const closeSearch = ({target}) => {
  if (target.closest('.search, .header__btn-search')) {
    return;
  } else {
    search.classList.remove('search_active');
    document.body.removeEventListener('click', closeSearch);
  }
}

searchBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.body.addEventListener('click', closeSearch);
  });
});
