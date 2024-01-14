import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '/src/styles/tailwind.css';
import '/src/styles/product.css';
import { getPbImageURL, pb, setStorageDay, compareDay } from '/src/lib/';

// pb 통신
const users = await pb.collection('users').getList(1, 1, {
  filter: 'username = "jump6746"',
});

console.log(users);

const records = await pb.collection('advertisement').getFullList({
  sort: '-created',
});

const productList = await pb.collection('product').getFullList({
  sort: '-created',
});

const kitList = await pb.collection('product').getFullList({
  filter: 'category = "도구"',
});

// querySelect

const advertisingImg = document.querySelector('.swiper-wrapper');
const dialog = document.querySelector('#dialog');
const todayBtn = document.querySelector('.todayButton');
const closeBtn = document.querySelector('.closeButton');
const product = document.querySelector('.product-list');
const kit = document.querySelector('.kit-list');

// 팝업창 기능 구현

// if (compareDay('day') || localStorage.getItem('day') === null) {
//   dialog.showModal();
// }
compareDay('day').then((resolve) => {
  if (resolve || localStorage.getItem('day') == null) {
    dialog.showModal();
  }
});

function handlePopup() {
  setStorageDay('day').then(dialog.close());
}

todayBtn.addEventListener('click', handlePopup);

closeBtn.addEventListener('click', () => {
  dialog.close();
});

// forEach - template

// 광고판 forEach

records.forEach(({ collectionId, id, photo, alt }) => {
  const template = /*html*/ `
  <div class="swiper-slide">
          <a href="/" class="advertising-slide"
            ><img
              src="${getPbImageURL(collectionId, id, photo)}"
              alt="${alt}"
          /></a>
        </div>
`;
  advertisingImg.insertAdjacentHTML('afterbegin', template);
});

// 상품 swiper - 1

productList.forEach(
  ({ collectionId, id, photo, label, brand, name, discount, price, limit }) => {
    if (name === '상품 준비중..') {
      return;
    }
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <li class="swiper-slide product-info">
      <a href="/src/pages/detail/#${id}" class="saveItem">
        <div class="image-container">
          <img
          src="${getPbImageURL(collectionId, id, photo)}"
          alt="${name}"
          class="product-img"
          />
        </div>
        <span class="name"> [${brand}]${name} </span>
        <span class="discount-price">
          ${discountPrice}원
        </span>
        <span class="label">${label}</span>
      </a>
      <button type="button">
        <img src="/assets/product-cart.svg" alt="장바구니 담기" />
      </button>
    </li>
    `;

    const tagTemplate = /* html */ `
      <span class="tag">${limit}</span>
    `;

    product.insertAdjacentHTML('afterbegin', template);

    const productInfo = document.querySelector('.product-info');
    if (limit) {
      productInfo.insertAdjacentHTML('beforeend', tagTemplate);
    }

    const discountTag = document.querySelector('.discount-price');

    const priceTemplate = /* html */ `
      <span class="price">${price}</span>
    `;

    const discountTemplate = /* html */ `
      <b>${discount}%</b>
    `;

    if (discount != 0) {
      discountTag.insertAdjacentHTML('afterbegin', discountTemplate);
      discountTag.insertAdjacentHTML('afterend', priceTemplate);
    }

    const saveItem = document.querySelector('.saveItem');

    async function saveItemInfo() {
      try {
        const getCurrentView = await localStorage.getItem('currentView');
        const currentData = JSON.parse(getCurrentView);

        const data = { collectionId, id, photo };
        currentData.push(data);

        await localStorage.setItem('currentView', JSON.stringify(currentData));
      } catch {
        const currentData = [];
        const data = { collectionId, id, photo };
        currentData.push(data);

        await localStorage.setItem('currentView', JSON.stringify(currentData));
      }
    }

    saveItem.addEventListener('click', saveItemInfo);
  }
);

// 상품 swiper - 2

kitList.forEach(
  ({ collectionId, id, photo, label, brand, name, discount, price, limit }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <li class="swiper-slide product-info kit-info">
      <a href="/src/pages/detail/#${id}" class="">
        <div class="image-container">
          <img
          src="${getPbImageURL(collectionId, id, photo)}"
          alt="${name}"
          class="product-img"
          />
        </div>
        <span class="name"> [${brand}]${name} </span>
        <span class="discount-price-kit">
          ${discountPrice}원
        </span>
        <span class="label">${label}</span>
      </a>
      <button>
        <img src="/assets/product-cart.svg" alt="장바구니 담기" />
      </button>
    </li>
    `;
    const tagTemplate = /* html */ `
      <span class="tag">${limit}</span>
    `;

    kit.insertAdjacentHTML('afterbegin', template);

    const kitInfo = document.querySelector('.kit-info');
    if (limit) {
      kitInfo.insertAdjacentHTML('beforeend', tagTemplate);
    }

    const discountTag = document.querySelector('.discount-price-kit');
    const priceTemplate = /* html */ `
      <span class="price">${price}</span>
    `;

    const discountTemplate = /* html */ `
      <b class="">${discount}%</b>
    `;

    if (discount != 0) {
      discountTag.insertAdjacentHTML('afterbegin', discountTemplate);
      discountTag.insertAdjacentHTML('afterend', priceTemplate);
    }
  }
);

// Swiper 옵션

// 광고판 swiper

const adverSwiper = new Swiper('.swiper-advertising', {
  loop: true,
  speed: 300,
  effect: 'fade',
  resistance: true,
  autoplay: {
    delay: 4000,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
});

// 상품 swiper - 1

const productSwiper = new Swiper('.swiper-product', {
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 16,
  navigation: {
    nextEl: '.product-next',
    prevEl: '.product-prev',
  },
});

// 상품 swiper - 2

const kitSwiper = new Swiper('.swiper-kit', {
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 16,
  navigation: {
    nextEl: '.kit-next',
    prevEl: '.kit-prev',
  },
});

// 최근 본 상품
