const searchBtns = document.querySelectorAll('.header__btn-search');
const search = document.querySelector('.search');

const closeSearch = ({target}) => {
  if (target.closest('.search, .header__btn-search')) {
    return;
  } else {
    search.classList.remove('search_active');
    document.body.removeEventListener('click', closeSearch);
  }
};

searchBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.body.addEventListener('click', closeSearch, true);
  });
});
