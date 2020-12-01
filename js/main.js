//open/close modal

const buttonAuth = document.querySelector('.header__login');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.modal-auth__close');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.header__username');
const outButton = document.querySelector('.header__out');
const body = document.querySelector('body');
const modalCart =   document.querySelector('.modal-cart');
const logInForm = document.querySelector('#logInForm');
const restRow = document.querySelector('.rest__row');
const main = document.querySelector('.main');
const rest = document.querySelector('.rest');
const tanuki = document.querySelector('.tanuki');
const tanukiTop = document.querySelector('.tanuki__top');
const logo = document.querySelector('.logo');
const tanukiRow = document.querySelector('.tanuki__row');

let login = localStorage.getItem('username');

const getData = async function(url){
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url},
     статус ошибки ${response.status}!`);
  }
  return await response.json();
}

function toggleAuth(){
  modalAuth.classList.toggle('is-open');
  body.classList.toggle('lock');
  loginInput.style.border = '';
}

function toggleCart(){
  modalCart.classList.toggle('is-open');
  body.classList.toggle('lock')
}

// authorization

function authorized(){
  function logOut(){
    login = '';
    buttonAuth.style.display = '';
    userName.style.display = 'none';
    outButton.style.display = '';
    outButton.removeEventListener('click',logOut);
    localStorage.removeItem('username');
    checkAuth();

  }
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline-block';
  outButton.style.display = 'block';
  outButton.addEventListener('click',logOut);
}

function notAuthorized(){

  function logIn(event){
    event.preventDefault();
    login = loginInput.value;
    if (login){
      localStorage.setItem('username',login);
      toggleAuth();
      buttonAuth.removeEventListener('click',toggleAuth);
      closeAuth.removeEventListener('click',toggleAuth);
      logInForm.removeEventListener('submit',logIn);
      logInForm.reset();
      checkAuth();
    } else {
      loginInput.style.border = '2px solid indianred';
    }
  }

  buttonAuth.addEventListener('click',toggleAuth);
  closeAuth.addEventListener('click',toggleAuth);
  logInForm.addEventListener('submit',logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

//rendering

function createCardRest(rest){

  const { image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery } = rest;
  const card = `
  <a  class="rest__column card" data-products=${products}>
     <div class = 'card__img'><img src=${image} alt=""></div> 
    <div class="card__top">
          <h3 class="card__title">${name}</h3>
          <div class="card__time">${timeOfDelivery} мин</div>
    </div>
      <div class="card__bot">
      <div class="card__rating">${stars}</div>
      <div class="card__price">От ${price} ₽</div>
      <div class="card__type">${kitchen}</div>
    </div>
  </a>
  `;
  restRow.insertAdjacentHTML('beforeend',card)
}

function addMenuTop(restaurant){
  const name = restaurant.children[1].children[0].textContent;
  const stars = restaurant.children[2].children[0].textContent;
  const price = restaurant.children[2].children[1].textContent;
  const kitchen = restaurant.children[2].children[2].textContent;
  const menuTop = `
<div class="tanuki__top">
  <h2 class="tanuki__title"><span>${name}</span><span class="tanuki__rating">${stars}</span></h2>
  <div class="tanuki__category"> <span>${price}</span> <img src="img/tanuki/tanuki__point.svg" alt="" class="point"/> <span>${kitchen}</span> </div>
</div>
  `;
  tanukiTop.insertAdjacentHTML('afterbegin',menuTop);
}

function createCardGood(goods){
  const { description, id, image, name, price } = goods;

  const card =`
 <div class="tanuki__card">
 <div class="tanuki__img"><img src=${image} alt=""></div> 
  <div class="tanuki__body">
    <h3 class="tanuki__name">${name}</h3>
    <p class="tanuki__text">${description}</p>
    <div class="tanuki__buy">
      <a href="#" class="tanuki__btn">В корзину</a>
      <span class="tanuki__price">${price} ₽</span>
    </div>
  </div>
</div>
  `;
  tanukiRow.insertAdjacentHTML('beforeend',card);
}

function openGoods(event){
  const target = event.target;
  const restaurant = target.closest('.card');
  if (restaurant  && login){
    tanukiRow.textContent = '';
    tanukiTop.textContent = '';
    main.classList.add('hide');
    rest.classList.add('hide');
    tanuki.classList.remove('hide');
    addMenuTop(restaurant);
    getData(`./db/${restaurant.dataset.products}`).then((data) =>{
      data.forEach(createCardGood);
    });
  } else if(restaurant){
  toggleAuth();
  }
}

function closeGoods(){
    main.classList.remove('hide');
    rest.classList.remove('hide');
    tanuki.classList.add('hide');
}

function init(){
  document.querySelector('.header__cart').addEventListener('click',toggleCart);

  document.querySelector('.modal-cart__close').addEventListener('click',toggleCart);

  document.querySelector('.modal-cart__disclame').addEventListener('click',toggleCart);

  restRow.addEventListener('click',openGoods);

  logo.addEventListener('click',closeGoods);

  checkAuth();

  getData('./db/partners.json').then((data) =>{
    data.forEach(createCardRest);
  });
}

init();