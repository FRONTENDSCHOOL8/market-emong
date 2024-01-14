import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '/src/styles/tailwind.css';
import '/src/styles/product.css';

const productTest = document.querySelector('.product-list');

function test(e) {
  e.preventDefault();
  const product1 = e.target.closest('.product-info');
  if (!product1) return;
  const url = product1.querySelector('.saveItem').href;
  const thumbnailSrc = product1.querySelector('.product-img').src;
  const thumbnailAlt = product1.querySelector('.product-img').alt;

  const data = localStorage.getItem('currentItem')
    ? JSON.parse(localStorage.getItem('currentItem'))
    : [];
  data.push({ url, thumbnailSrc, thumbnailAlt });
  // console.log(data);
  localStorage.setItem('currentItem', JSON.stringify(data));
}

function test2() {
  const saveItem = JSON.parse(localStorage.getItem('currentItem'));
  if (!saveItem) return;
  const recently = document.querySelector('.recently-wrapper');
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

productTest.addEventListener('click', test);

test2();

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
