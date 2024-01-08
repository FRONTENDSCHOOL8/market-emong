// 헤더 scroll
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  const subSearch = document.querySelector('.sub-search');
  const subCart = document.querySelector('.sub-cart');
  const subNotice = this.document.querySelector('.sub-notice');

  if (document.documentElement.scrollTop > 100) {
    nav.classList.add('active', 'shadow-md');
    subSearch.style.display = 'block';
    subCart.style.display = 'block';
    subNotice.style.display = 'none';
  } else {
    nav.classList.remove('active');
    subSearch.style.display = 'none';
    subCart.style.display = 'none';
    subNotice.style.display = 'block';
  }
});

// 고객센터 hover
document.querySelector('.user-info').addEventListener('mouseenter', () => {
  const userInfoList = document.querySelector('.info-list');
  userInfoList.style.visibility = 'visible';
});

document.querySelector('.user-info').addEventListener('mouseleave', () => {
  const userInfoList = document.querySelector('.info-list');
  userInfoList.style.visibility = 'hidden';
});

// 카테고리 hover
document
  .querySelector('.header-category')
  .addEventListener('mouseenter', () => {
    const categoryList = document.querySelector('.category-list');
    categoryList.style.visibility = 'visible';
  });

document
  .querySelector('.header-category')
  .addEventListener('mouseleave', () => {
    const categoryList = document.querySelector('.category-list');
    categoryList.style.visibility = 'hidden';
  });
