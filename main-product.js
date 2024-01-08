import PocketBase from 'pocketbase';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '/src/styles/product.css';

function getPbImageURL(collectionId, id, fileName = 'photo') {
  return `${
    import.meta.env.VITE_PB_API
  }/files/${collectionId}/${id}/${fileName}`;
}

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const productList = await pb.collection('product').getFullList({
  sort: '-created',
});

const kitList = await pb.collection('product').getFullList({
  filter: 'category = "도구"',
});

const product = document.querySelector('.product-list');
const kit = document.querySelector('.kit-list');

productList.forEach(
  ({ collectionId, id, photo, label, brand, name, discount, price, limit }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <li class="swiper-slide product-info">
      <a href="/" class="">
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
      <button>
        <img src="./src/assets/product-cart.svg" alt="장바구니 담기" />
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
  }
);

kitList.forEach(
  ({ collectionId, id, photo, label, brand, name, discount, price, limit }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <li class="swiper-slide product-info kit-info">
      <a href="/" class="">
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
        <img src="./src/assets/product-cart.svg" alt="장바구니 담기" />
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

const productSwiper = new Swiper('.swiper-product', {
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 16,
  navigation: {
    nextEl: '.product-next',
    prevEl: '.product-prev',
  },
});

const kitSwiper = new Swiper('.swiper-kit', {
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 16,
  navigation: {
    nextEl: '.kit-next',
    prevEl: '.kit-prev',
  },
});
