const getBooks = document.querySelector('.books'),
   getBooksItem = document.querySelectorAll('.book'),
   adv = document.querySelector('.adv');

// Восстановить порядок книг
getBooks.prepend(getBooksItem[1]);
getBooks.append(getBooksItem[2]);

// Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = `url('./image/you-dont-know-js.jpg')`;

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
getBooksItem[4].after(getBooksItem[3]);
getBooksItem[4].querySelector('a').innerHTML = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
adv.remove();

// Восстановить порядок глав во второй книге
const getUlBookTwo = getBooksItem[0].querySelector('ul');
const getLiBookTwo = getUlBookTwo.querySelectorAll('li');
getLiBookTwo[3].after(getLiBookTwo[6]);
getLiBookTwo[4].before(getLiBookTwo[8]);
getLiBookTwo[10].before(getLiBookTwo[2]);

// Восстановить порядок глав в пятой книге
const getUlBookFive = getBooksItem[5].querySelector('ul');
const getLiBookFive = getUlBookFive.querySelectorAll('li');
getLiBookFive[1].after(getLiBookFive[9]);
getLiBookFive[5].after(getLiBookFive[2]);
getLiBookFive[8].before(getLiBookFive[5]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const getUlBookSix = getBooksItem[2].querySelector('ul');
const getLiBookSix = getUlBookSix.querySelectorAll('li');
const newLi = document.createElement('li');
newLi.innerHTML = 'Глава 8: За пределами ES6';

getLiBookSix[8].append(newLi);


