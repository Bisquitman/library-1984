import Navigo from 'navigo';

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn');
const backBtns = document.querySelectorAll('.header__btn-back');
const searchBtns = document.querySelectorAll('.header__btn-search');
const search = document.querySelector('.search');

const fieldsBtnSort = document.querySelector('.fields__btn_sort');
const fieldsListSort = document.querySelector('.fields__list_sort');
const fieldsBtnFilter = document.querySelector('.fields__btn_filter');
const fieldsListFilter = document.querySelector('.fields__list_filter');

const form = document.querySelector('.add__form');

const router = new Navigo('/', {
  hash: true,
});

const closeAllPages = () => {
  library.classList.add('hide');
  book.classList.add('hide');
  add.classList.add('hide');
};

router.on({
  '/': () => {
    closeAllPages();
    library.classList.remove('hide');
    document.body.classList.remove('body_gradient')
  },
  'book': () => {
    closeAllPages();
    book.classList.remove('hide');
    document.body.classList.add('body_gradient')
  },
  'add': () => {
    closeAllPages();
    add.classList.remove('hide');
    document.body.classList.add('body_gradient')
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
    form.reset();
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
    document.body.addEventListener('click', closeSearch, true);
  });
});

const controlField = (btn, list, offList) => {
  btn.addEventListener('click', () => {
    list.classList.toggle('fields__list_active');
    offList.classList.remove('fields__list_active');
  });

  list.addEventListener('click', ({target}) => {
    if (target.classList.contains('fields__btn')) {
      list.classList.remove('fields__list_active');
    }
  });
};

controlField(fieldsBtnSort, fieldsListSort, fieldsListFilter);
controlField(fieldsBtnFilter, fieldsListFilter, fieldsListSort);

const changeFieldset = () => {
  const fieldsets = document.querySelectorAll('.add__fieldset');
  const addBtn = document.querySelector('.add__btn');
  let count = 0;

  addBtn.addEventListener('click', ({target}) => {
    const fieldset = fieldsets[count];
    let valid = true;

    for (const element of fieldset.elements) {
      if (!element.checkValidity()) {
        element.classList.add('not-valid');
        valid = false;
      } else {
        element.classList.remove('not-valid');
      }
    }

    if (valid) {
      count += 1;
      if (count >= fieldsets.length - 1) {
        addBtn.textContent = 'Добавить книгу';
      }
      if (count >= fieldsets.length) {
        const data = true;  // данные с сервера
        if (data) {
          form.reset();
          router.navigate('/');
          count = 0;
          addBtn.textContent = 'Далее';
        }
      }

      fieldset.classList.add('hide');
      fieldsets[count].classList.remove('hide');
    }
  });
};

changeFieldset();
