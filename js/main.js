
document.querySelector('.header__login').onclick = () =>{
  document.querySelector('.modal-auth').classList.toggle('is-open');
  document.querySelector('body').classList.toggle('lock')
}

document.querySelector('.modal-auth__close').onclick = () =>{
  document.querySelector('.modal-auth').classList.remove('is-open');
  document.querySelector('body').classList.remove('lock')
}

document.querySelector('.header__cart').onclick = () =>{
  document.querySelector('.modal-cart').classList.toggle('is-open');
  document.querySelector('body').classList.toggle('lock')
}

document.querySelector('.modal-cart__close').onclick = () =>{
  document.querySelector('.modal-cart').classList.remove('is-open');
  document.querySelector('body').classList.remove('lock')
}


document.querySelector('.modal-cart__disclame').onclick = () =>{
  document.querySelector('.modal-cart').classList.remove('is-open');
  document.querySelector('body').classList.remove('lock')
}
// authorization


//const buttonAuth = document.querySelector('.header__login');
//const modalAuth = document.querySelector('.modal-auth');
//const closeAuth = document.querySelector('.modal-auth__close');
//const logInForm = document.querySelector('#modal-auth__loginForm');
//const loginInput = document.querySelector('#login');
//const userName = document.querySelector('.header__username');
//const outButton = document.querySelector('.header__out');

//let login = localStorage.getItem('username');

//function toggleModalAuth() {
//    modalAuth.classList.toggle('is-open');
//}

//function borderClear(){
//    loginInput.style.border = 'none';
//}
//function authorized() {
//    function logOut(){
//        login = '';
//        localStorage.removeItem('username');
//        userName.style.display = 'none';
//        outButton.style.display = '';
//        buttonAuth.style.display = '';
//        outButton.removeEventListener('click', logOut);
//        checkAuth();
//    }

//    console.log('Авторизован');

//    userName.textContent = login;

//    buttonAuth.style.display = 'none';
//    outButton.style.display = 'block';
//    userName.style.display = 'block';

//    outButton.addEventListener('click', logOut);
//}

//function notAuthorized() {

//    console.log('Не авторизован');
//    function checkLogin(event){
//        event.preventDefault();
//        login = loginInput.value;
//        localStorage.setItem('username', login);
//        if(login){
//            logIn();
//            borderClear();
//        } else {
//            loginInput.style.border = '1px solid red'
//        }
//    }
//    function logIn(event){
//        // event.preventDefault();
//        login = loginInput.value;
//        localStorage.setItem('username', login);
//        toggleModalAuth();
//        buttonAuth.removeEventListener('click', toggleModalAuth);
//        closeAuth.removeEventListener('click', toggleModalAuth);
//        logInForm.removeEventListener('submit', logIn);
//        logInForm.reset();
//        loginInput.style.border = 'none'
//        checkAuth();
//    }

//    buttonAuth.addEventListener('click', toggleModalAuth);
//    closeAuth.addEventListener('click', toggleModalAuth);
//    closeAuth.addEventListener('click', borderClear);
//    logInForm.addEventListener('submit', checkLogin);

//}
//function checkAuth(){
//    if (login){
//        authorized();
//    } else {
//        notAuthorized();
//    }
//}

//checkAuth();

////
//const cardsRestaurants = document.querySelector('.rest__row');

//function createCardRestaurant(){
//    const card = `
//<a class="rest__column card">
//    <img src="img/home/rest/card_1.png" alt="" class="card__img">
//    <div class="card__top">
//        <h3 class="card__title">Пицца плюс</h3>
//        <div class="card__time">50 мин</div>
//    </div>
//    <div class="card__bot">
//        <div class="card__rating">4.5</div>
//        <div class="card__price">От 900 ₽</div>
//        <div class="card__type">Пицца </div>
//    </div>
//</a>
//    `;
//    cardsRestaurants.insertAdjacentHTML('afterbegin', card)
//}
//createCardRestaurant();