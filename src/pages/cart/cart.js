import PocketBase from 'pocketbase';
import '/src/styles/tailwind.css';
import { getPbImageURL, pb } from '/src/lib/';

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

// const productTemplate = document.querySelector('.cart-list');
// 로그인 유저 정보 가져오기
// const userData = await pb.collection('users').getOne('q4l7a4urcjb33hz');
// const { id } = userData;

const cartListCharater = document.querySelector('.product-list-charater');
const cartListTool = document.querySelector('.product-list-tool');

// 캐릭터 템플릿
// const cartDataCharacter = await pb
//   .collection('carts_products_data')
//   .getFullList({
//     filter: `packageType = "캐릭터" && users_record = "${id}"`,
//     sort: 'created',
//   });

const cartDataCharacter = await pb.collection('product').getFullList({
  sort: '-created',
});

cartDataCharacter.forEach(
  ({ collectionId, id, photo, brand, name, discount, price }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <ul class="flex items-center justify-around py-3">
      <li>
        <input
          type="checkbox"
          id="product-select"
          name="productSelect"
          class="h-5 w-5 appearance-none bg-unchecked-icon bg-cover bg-center bg-no-repeat checked:bg-checked-icon"
        />
        <label for="product-select"></label>
      </li>
      <li class="flex items-center gap-1">
        <!-- 상품이미지 -->
        <span>
          <img
            src="${getPbImageURL(collectionId, id, photo)}"
            alt="${name}"
            class="h-73pxr w-63pxr border border-gray-200 p-1"
          />
        </span>
        <!-- 상품이름 -->
        <span class="w-325pxr font-bold">
          [${brand}]${name}
        </span>
      </li>
      <!-- 상품갯수 추가, 감소 버튼 -->
      <li
        class="product-count flex justify-between w-90pxr h-30pxr items-center border border-gray-200"
      >
        <button
          type="button"
          class="minus-button h-7 w-7 bg-minus-icon bg-cover bg-center bg-no-repeat hover:bg-slate-200"
          disabled
        >
          <span class="sr-only">수량감소</span>
        </button>
        <span class="count">1</span>
        <button
          type="button"
          class="plus-button h-7 w-7 bg-plus-icon bg-cover bg-center bg-no-repeat hover:bg-slate-200"
        >
          <span class="sr-only">수량증가</span>
        </button>
      </li>
      <li class="flex flex-col w-130pxr text-end">
        <!-- 상품금액 -->
        <span class="discount-price text-right font-bold"> ${discountPrice}원 </span>
        <span class="cost-price line-through text-right text-sm text-gray-400"> ${price}원 </span>
      </li>
      <li>
        <!-- 삭제 -->
        <button
          type="button"
          class="delete-button h-8 w-7 bg-delete-icon bg-cover bg-center bg-no-repeat"
        >
          <span class="sr-only">상품삭제</span>
        </button>
      </li>
    </ul>
  `;

    cartListCharater.insertAdjacentHTML('afterbegin', template);
  }
);

// 도구 템플릿
const cartDataTool = await pb.collection('product').getFullList({
  sort: '-created',
});

cartDataTool.forEach(
  ({ collectionId, id, photo, brand, name, discount, price }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <ul class="flex items-center justify-around py-3">
      <li>
        <input
          type="checkbox"
          id="product-select"
          name="productSelect"
          class="h-5 w-5 appearance-none bg-unchecked-icon bg-cover bg-center bg-no-repeat checked:bg-checked-icon"
        />
        <label for="product-select"></label>
      </li>
      <li class="flex items-center gap-1">
        <!-- 상품이미지 -->
        <span>
          <img
            src="${getPbImageURL(collectionId, id, photo)}"
            alt="${name}"
            class="h-73pxr w-63pxr border border-gray-200 p-1"
          />
        </span>
        <!-- 상품이름 -->
        <span class="w-325pxr font-bold">
          [${brand}]${name}
        </span>
      </li>
      <!-- 상품갯수 추가, 감소 버튼 -->
      <li
        class="product-count flex justify-between w-90pxr h-30pxr items-center border border-gray-200"
      >
        <button
          type="button"
          class="minus-button h-7 w-7 bg-minus-icon bg-cover bg-center bg-no-repeat hover:bg-slate-200"
          disabled
        >
          <span class="sr-only">수량감소</span>
        </button>
        <span class="count">1</span>
        <button
          type="button"
          class="plus-button h-7 w-7 bg-plus-icon bg-cover bg-center bg-no-repeat hover:bg-slate-200"
        >
          <span class="sr-only">수량증가</span>
        </button>
      </li>
      <li class="flex flex-col w-130pxr text-end">
        <!-- 상품금액 -->
        <span class="discount-price text-right font-bold"> ${discountPrice}원 </span>
        <span class="cost-price line-through text-right text-sm text-gray-400"> ${price}원 </span>
      </li>
      <li>
        <!-- 삭제 -->
        <button
          type="button"
          class="delete-button h-8 w-7 bg-delete-icon bg-cover bg-center bg-no-repeat"
        >
          <span class="sr-only">상품삭제</span>
        </button>
      </li>
    </ul>
  `;

    cartListTool.insertAdjacentHTML('afterbegin', template);
  }
);

// 수량, 금액 변경
const minusButtons = Array.from(document.querySelectorAll('.minus-button'));
const plusButtons = Array.from(document.querySelectorAll('.plus-button'));
const productAmount = document.querySelectorAll('.count');
productAmount.textContent = 1;

function changeAmount(e) {
  e.preventDefault();

  const isPlusButton = e.target.classList.contains('plus-button');
  const targetCountElement = e.target.parentElement.querySelector('.count');
  let currentCount = parseInt(targetCountElement.textContent);

  if (!isPlusButton && currentCount > 1) {
    currentCount -= 1;
  } else if (isPlusButton) {
    currentCount += 1;
  }

  targetCountElement.textContent = currentCount;

  const minusButton = e.target.parentElement.querySelector('.minus-button');
  minusButton.disabled = currentCount === 1;
}

minusButtons.forEach((minusButton) => {
  minusButton.addEventListener('click', changeAmount);
});

plusButtons.forEach((plusButton) => {
  plusButton.addEventListener('click', changeAmount);
});
