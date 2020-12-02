//open/close modal

const buttonAuth = document.querySelector('.header__login');
const modalAuth = document.querySelector('.modal-auth');
const buttonCart = document.querySelector('.header__cart');
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
const modalCartRow = document.querySelector('.modal-cart__row');
const cartPricetag = document.querySelector('.modal-cart__pricetag');

let login = localStorage.getItem('username');

let cart = JSON.parse(localStorage.getItem(`delivery_${login}`)) || [];

function saveCart() {
  localStorage.setItem(`delivery_${login}`,JSON.stringify(cart))
}
function downloadCart(){
  cart = JSON.parse(localStorage.getItem(`delivery_${login}`)) || [];
}

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
  outButton.style.display = 'flex';
  buttonCart.style.display = 'block';
  outButton.addEventListener('click',logOut);
}

function notAuthorized(){

  function logIn(event){
    event.preventDefault();
    login = loginInput.value;
    if (login){
      localStorage.setItem('username',login);
      toggleAuth();
      downloadCart();
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
  buttonCart.style.display = '';
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
      <button class="tanuki__btn"  id="${id}">В корзину</button>
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


function addToCart(event){
  const target = event.target;
  const buttonAddToCart = target.closest('.tanuki__btn');
  if(buttonAddToCart){
    const card = target.closest('.tanuki__card');
    const title = card.querySelector('.tanuki__name').textContent;
    const cost = card.querySelector('.tanuki__price').textContent;
    const id = buttonAddToCart.id;
    const food = cart.find((item) => {
      return item.id === id;
    })
  if(food){
    food.count ++;
    } else {
      cart.push({
        id,
        title,
        cost,
        'count' : 1,
      });
    }
    saveCart();
  }
}

function renderCart(){
  modalCartRow.textContent = '';

  cart.forEach(({ cost, title, id, count }) => {
    const itemCart = `
      <div class="modal-cart__column food">
        <span class="food__name">${title}</span>
        <div class="food__bottom">
          <strong class="food__price">${cost}</strong>
          <button class="food__minus" data-id="${id}">-</button>
          <span class="food__counter">${count}</span>
          <button class="food__plus" data-id="${id}">+</button>
        </div>
      </div>
    `
    modalCartRow.insertAdjacentHTML('afterbegin',itemCart);
  })
  const totalPrice = cart.reduce((result, item) => {
    return result + (parseFloat(item.cost) * item.count);
  }, 0)
  cartPricetag.textContent = totalPrice + " ₽";
}

function changeCount(event) {
  const target = event.target;
  if (target.classList.contains('food__plus')){
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    })
      food.count ++;
      renderCart();
  }

  if (target.classList.contains('food__minus')){
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    })
    if (food.count == 1){
      food.count --;
      cart.splice(cart.indexOf(food),1);
      renderCart();
    } else {
      food.count --;
      renderCart();
    }
  }
}

function init(){
  buttonCart.addEventListener('click',() =>{
    renderCart();
    toggleCart();
  });

  document.querySelector('.modal-cart__close').addEventListener('click',toggleCart);

  document.querySelector('.modal-cart__disclame').addEventListener('click',() => {
    cart.length = 0;
    renderCart();
  });

  restRow.addEventListener('click',openGoods);

  logo.addEventListener('click',closeGoods);

  tanukiRow.addEventListener('click',addToCart);

  checkAuth();

  modalCart.addEventListener('click', changeCount);

  getData('./db/partners.json').then((data) =>{
    data.forEach(createCardRest);
  });
}
init();