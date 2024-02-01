import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '/src/styles/product.css';
import '/src/styles/tailwind.css';

const mainRecently1 = document.querySelector('.product-list');
const mainRecently2 = document.querySelector('.kit-list');

/**
 * TODO: 삼항연산자는 적극적으로 리팩토링하시길 권합니다.
 * 알아보기 어려운 코드와 에러를 만드는 1등 공신입니다.
 */
const getCurrentItem = () => {
  const data = localStorage.getItem('currentItem')

  if (data) {
      return JSON.parse(localStorage.getItem('currentItem'))
  }

  return [];
}

const setCurrentItem = (product1) => {
  const url = product1.querySelector('.saveItem').href;
  const thumbnailSrc = product1.querySelector('.product-img').src;
  const thumbnailAlt = product1.querySelector('.product-img').alt;
  const data = getCurrentItem();
  data.push({ url, thumbnailSrc, thumbnailAlt });
  localStorage.setItem('currentItem', JSON.stringify(data));
}

function recentData(e) {
  e.preventDefault();
  const product1 = e.target.closest('.product-info');
  if (!product1) return;
  /**
   * TODO: 작업 단위를 별개의 함수로 분리해 보세요.
   * 약간의 중복 코드를 감수해야 하지만, 그만한 가치가 있습니다.
   */
  setCurrentItem(product1);
  // TODO: 생산자와 소비자를 가까운 곳에 두어야 정신력 소모가 줄어듭니다.
  const url = product1.querySelector('.saveItem').href;
  location.href = url;
}

export function recentItem() {
  const saveItem = JSON.parse(localStorage.getItem('currentItem'));
  if (!saveItem) return;
  const recently = document.querySelector('.recently-wrapper');
  // recently.style.display = 'block';
  // recently.classList.remove('hidden');
  console.log(recently);
  if (!recently) return;
  saveItem.forEach((item) => {
    // console.log(item, item.thumbnailSrc);
    const template = /* html */ `
      <li class="swiper-slide recently-slide">
        <a href="${item.url}" class="flex justify-center">
          <div class="recently-img">
            <img
            src="${item.thumbnailSrc}"
            alt="${item.thumbnailAlt}"
            class="w-40pxr h-50pxr"
            />
          </div>
        </a>
      </li>
      `;
    // console.log(template);
    recently.insertAdjacentHTML('afterbegin', template);
  });
}

mainRecently1.addEventListener('click', recentData);
if (mainRecently2) {
  mainRecently2.addEventListener('click', recentData);
}

recentItem();

// 최근본 상품 swiper
const recentSwiper = new Swiper('.recently-container', {
  direction: 'vertical',
  resistance: true,
  allowTouchMove: false,
  slidesPerView: 2.5,
  spaceBetween: 4,
  navigation: {
    nextEl: '.recently-prev',
    prevEl: '.recently-next',
  },
  keyboard: {
    enabled: true,
  },
});
