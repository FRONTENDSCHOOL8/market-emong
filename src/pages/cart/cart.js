// import PocketBase from 'pocketbase';

document
  .querySelector('.cart-togglebutton')
  .addEventListener('click', function () {
    document.querySelector('.cart-product').classList.toggle('hidden');
  });
