import {getBooks, getLabels, API_URI} from "./serviceBook.js";

const bookContainer = document.querySelector('.book__container');

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

/*
export const renderBook = async () => {
  const [books, labels] = await Promise.all([getBooks(), getLabels()]);
}
 */

export const renderBook = async (id) => {
  bookContainer.textContent = '';

  const [book, labels] = await Promise.all([getBooks(id), getLabels()]);

  const singleBook = (({author, description, image, label, rating, title}) => {
    bookContainer.innerHTML = `
        <div class="book__wrapper">
          <img class="book__image" src="${API_URI}/${image}" alt="Обложка книги ${title}">

          <button class="book__label book__label_img book__btn">${labels[label]}</button>
        </div>

        <div class="book__content">
          <h2 class="book__title">${title}</h2>

          <p class="book__author">${author}</p>

          <div class="book__rating">
            ${getStars(rating).join('')}
          </div>

          <p class="book__subtitle">Описание</p>

          <p class="book__description">${description.substring(0, 500)}...</p>
        </div>
      `;
  });
  singleBook(book);

/*
  const book = await getBooks(id)
    .then((book) => {
      console.log(book);
      const {author, description, image, label, rating, title} = book;
      bookContainer.innerHTML = `
        <div class="book__wrapper">
          <img class="book__image" src="${API_URI}/${image}" alt="Обложка книги ${title}">

          <button class="book__label book__label_img book__btn">${label}</button>
        </div>

        <div class="book__content">
          <h2 class="book__title">${title}</h2>

          <p class="book__author">${author}</p>

          <div class="book__rating">
            ${getStars(rating).join('')}
          </div>

          <p class="book__subtitle">Описание</p>

          <p class="book__description">${description.substring(0, 500)}...</p>
        </div>
      `;
    });
*/
  /*
  author: "Майкл Ньютон"
  description: "То что описано в книге, окончательно снимает завесу тайны с самого загадочного процесса, который ожидает каждого из нас. Все, оказывается, не так плохо, как нам представляли на протяжении многих тысячелетий различные религиозные учения. Эта книга помогает нам взглянуть на смерть более оптимистично – не как на ужасное наказание, а как на возможность чудесного перехода в другую, полную свободы и духовных переживаний жизнь. Из этой книги Вы узнаете, как происходит удивительный процесс перевоплощения души: кто нас встретит после физической смерти, куда мы направимся дальше, кто являются нашими Гидами и ангелами хранителями, чем они занимаются и чем мы занимаемся после смерти, а также какая структура и иерархия существуют в том неизвестном нам мире. Вы также узнаете, почему и как мы выбираем свое тело, страну, в которой мы живем, профессию, друзей и даже «врагов». И все это не чьи-то выдумки и домыслы, не легенды и мифы различных религий, а результаты научно обоснованных исследований, проведенных одним из лучших гипнотерапевтов нашего времени доктором Майклом Ньютоном."
  id: "805584301668"
  image: "image/805584301668.jpg"
  label: "wish"
  rating: 4
  title: "Путешествия Души"
  */
}
