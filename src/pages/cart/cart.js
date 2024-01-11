// import PocketBase from 'pocketbase';

document.querySelectorAll('.cart-toggle').forEach(function (toggle) {
  toggle.addEventListener('click', function () {
    const cartProduct = this.nextElementSibling;
    const toggleIcon = this.querySelector('.toggle-icon');

    if (cartProduct.style.display === 'none') {
      cartProduct.style.display = 'block';
      toggleIcon.classList.remove('rotate-180');
    } else {
      cartProduct.style.display = 'none';
      toggleIcon.classList.add('rotate-180');
    }
  });
});

// script.js
window.checkSelectAll = function () {
  // 전체 체크박스
  const checkboxes = document.querySelectorAll('input[name="animal"]');
  // 선택된 체크박스
  const checked = document.querySelectorAll('input[name="animal"]:checked');
  // select all 체크박스
  const selectAll = document.querySelector('input[name="selectall"]');

  if (checkboxes.length === checked.length) {
    selectAll.checked = true;
  } else {
    selectAll.checked = false;
  }
};

window.selectAll = function (selectAll) {
  const checkboxes = document.getElementsByName('animal');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
};
