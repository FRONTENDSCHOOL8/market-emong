// import PocketBase from 'pocketbase';

document.querySelectorAll('.cart-toggle').forEach(function (toggle) {
  toggle.addEventListener('click', function () {
    const cartProduct = this.nextElementSibling;
    const toggleIcon = this.querySelector('.toggle-icon');

    if (cartProduct.style.display === 'none') {
      cartProduct.style.display = 'block';
      toggleIcon.classList.add('rotate-180');
    } else {
      cartProduct.style.display = 'none';
      toggleIcon.classList.remove('rotate-180');
    }
  });
});
