import {router} from './router.js';
import {clearPreview} from './upload.js';
import {addBook} from "./serviceBook.js";
import toBase64 from "./toBase64.js";

const form = document.querySelector('.add__form');
const fieldsets = document.querySelectorAll('.add__fieldset');
const addBtn = document.querySelector('.add__btn');
const btnBack = document.querySelector('.add__btn-back');
let count = 0;

const sendBook = async () => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.image = await toBase64(data.image);

  const book = await addBook(data);
  if (book) {
    form.reset();
    clearPreview();
    router.navigate('/');
    addBtn.textContent = 'Далее';
  }
};

const changeFieldset = () => {
  if (count >= fieldsets.length - 1) {
    addBtn.textContent = 'Добавить книгу';
  } else {
    addBtn.textContent = 'Далее';
  }
  fieldsets[count].classList.remove('hide');
};

const initFieldset = () => {
  addBtn.addEventListener('click', () => {
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

    if (!valid) return;
    fieldset.classList.add('hide');
    count += 1;

    if (count >= fieldsets.length) {
      count = 0;
      sendBook();
    }
    changeFieldset();
  });

  btnBack.addEventListener('click', () => {
    if (count === 0) {
      form.reset();
      clearPreview();
      router.navigate('/');
      return;
    }
    fieldsets[count].classList.add('hide');
    count--;
    changeFieldset();
  });
};
export default initFieldset;
