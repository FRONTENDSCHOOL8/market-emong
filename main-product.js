import PocketBase from 'pocketbase';
import Swiper from 'swiper';
import './src/styles/style.css';

const template = /* html */ `
  <li class="product-info">
    <a href="/" class="">
      <img
        src="/src/assets/product-testImg.png"
        alt=""
        class="product-img"
      />
      <span class="label">${label}</span>
      <span class="name"> [${brand}]${name} </span>
      <span class="discount-price">
        <b class="">${discount}%</b>
        ${discountPrice}원
      </span>
      <span class="price">${price}</span>
      <span class="small-desc">간단한 설명</span>
    </a>
    <button>
      <img src="./src/assets/product-cart.svg" alt="장바구니 담기" />
    </button>
    <span class="tag">${limit}</span>
  </li>
`;

const list = document.querySelector('.product-list');

list.insertAdjacentHTML('afterbegin', template);
