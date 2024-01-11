// top banner
document.querySelector('.banner-close').addEventListener('click', () => {
  const topBanner = document.querySelector('.header-topbanner');
  topBanner.style.display = 'none';
});
// 헤더 scroll
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  const subSearch = document.querySelector('.sub-search');
  const subCart = document.querySelector('.sub-cart');
  const subNotice = document.querySelector('.sub-notice');
  const subNav = this.document.querySelector('.header-nav>ul');

  if (document.documentElement.scrollTop > 110) {
    nav.classList.add('active', 'shadow-md');
    subNav.classList.add('gap-11');
    subNav.classList.remove('gap-20');
    subSearch.style.display = 'block';
    subCart.style.display = 'block';
    subNotice.style.display = 'none';
  } else {
    nav.classList.remove('active');
    subNav.classList.remove('gap-11');
    subNav.classList.add('gap-20');
    subSearch.style.display = 'none';
    subCart.style.display = 'none';
    subNotice.style.display = 'block';
  }
});

// 고객센터 hover
const userInfo = document.querySelector('.user-info');
const userInfoList = document.querySelector('.info-list');

function userToggle(eventStyle) {
  userInfo.addEventListener(eventStyle, () => {
    if (eventStyle === 'mouseenter') {
      userInfoList.style.visibility = 'visible';
    } else if (eventStyle === 'mouseleave') {
      userInfoList.style.visibility = 'hidden';
    }
  });
}

userToggle('mouseenter');
userToggle('mouseleave');

// 카테고리 hover
const headerCategory = document.querySelector('.header-category');
const categoryList = document.querySelector('.category-list');

function headerToggle(eventStyle) {
  headerCategory.addEventListener(eventStyle, () => {
    if (eventStyle === 'mouseenter') {
      categoryList.style.visibility = 'visible';
    } else if (eventStyle === 'mouseleave') {
      categoryList.style.visibility = 'hidden';
    }
  });
}

headerToggle('mouseenter');
headerToggle('mouseleave');
