import PocketBase from 'pocketbase';
import '/src/styles/product.css';
import '/src/styles/tailwind.css';
import { getPbImageURL, pb } from '/src/lib/';

const product = document.querySelector('.product-list');

const productList = await pb.collection('product').getFullList({
  sort: '-created',
});

productList.forEach(
  ({ collectionId, id, photo, label, brand, name, discount, price, limit }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <li class="product-info">
      <a href="/" class="">
        <div class="image-container">
          <img
          src="${getPbImageURL(collectionId, id, photo)}"
          alt="${name}"
          class="product-img"
          />
          
        </div>
        <p class="text-12pxr">미래배송</p>
        <span class="name"> [${brand}]${name} </span>
        <span class="discount-price">
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
