import PocketBase from 'pocketbase';
import '/src/styles/product.css';
import '/src/styles/tailwind.css';
// import gsap from 'gsap';
import { getPbImageURL, pb, comma } from '/src/lib/';

const hash = window.location.hash.slice(1);

// 상품 페이지 추천순 물음표 hover
const userInfo = document.querySelector('.list-recommend');
const userInfoList = document.querySelector('.list-question');

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

// main이랑 같은 코드 데이터 -> 상품 불러오기
const product = document.querySelector('.product-list');

// 순서 함수
const productList = await pb.collection('product').getFullList({
  sort: `${hash}`,
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
          ${comma(discountPrice)}원
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
      <span class="price">${comma(price)}</span>
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
