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

// 로그인 유저 정보 가져오기 test
// const userData = await pb.collection('users').getOne('6kki52fp9i5fmjy');
// const { id } = userData;

const cartListCharater = document.querySelector('.product-list-charater');
const cartListTool = document.querySelector('.product-list-tool');

const cartDataCharacter = await pb.collection('product').getFullList({
  filter: `category = "캐릭터"`,
  sort: '-created',
});

cartDataCharacter.forEach(
  ({ collectionId, id, photo, brand, name, discount, price }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <ul class="flex items-center justify-around py-3 border-b border-gray-200">
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
  filter: `category = "도구"`,
  sort: '-created',
});

cartDataTool.forEach(
  ({ collectionId, id, photo, brand, name, discount, price }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /* html */ `
    <ul class="flex items-center justify-around py-3 border-b border-gray-200">
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

// 배송지 정보

const cartList = document.querySelector('.cart-price');

// test 유저 등록 -> 로그인 후 로그인 유저 정보 랜더링
const userAddress = await pb.collection('users').getOne('6kki52fp9i5fmjy');
const { address } = userAddress;

function updateTemplate() {
  const template = /* html */ `

    <div class="m-auto border p-5 ">
      <div class="flex items-center pb-3">
        <img src="/src/assets/cartPage/ic-location.svg" alt="배송지" />
        <span>배송지</span>
      </div>
      <div class="pb-6">
        <!-- 로그인 유저 주소 데이터 랜더링 -->
        <h3>${address}</h3>
        <span class="text-bluemong text-xs font-bold">미래배송</span>
      </div>
      <button
        type="button"
        class="w-full font-bold rounded-lg border-2 border-skybluemong py-2 text-bluemong transition-all hover:bg-skybluemong hover:text-white"
      >
        배송지 변경
      </button>
    </div>

    <div class="bg-gray-50 p-5">
      <!-- 상품 금액, 금액 합 랜더링 -->
      <div class="flex justify-between pb-4">
        <span>상품금액</span>
        <span>원</span>
      </div>
      <div class="flex justify-between pb-4">
        <span>상품할인금액</span>
        <span>원</span>
      </div>
      <div class="flex justify-between items-center pb-4">
        <span>배송비</span>
        <span class="text-bluemong text-sm">마켓에몽은 <strong>365일</strong> 언제나 무료배송!</span>
      </div>
      <!-- 금액의 총 합 -->
      <div class="flex justify-between border-t-2 py-4">
        <span>결제예정금액</span>
        <span>
          <strong><!-- 상품금액+배송비 합 --></strong>
          <span>원</span>
        </span>
      </div>
      <div class="flex justify-end gap-1 text-xs">
        <span class="rounded-sm bg-orange-600 px-1 text-white"
          >적립</span
        >
        <span>로그인 후 회원 등급에 따라 적립</span>
      </div>
    </div>
  `;
  cartList.insertAdjacentHTML('afterbegin', template);
}
updateTemplate();
