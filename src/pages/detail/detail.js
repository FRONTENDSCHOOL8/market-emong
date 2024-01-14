import '/src/styles/tailwind.css';
import { getPbImageURL, pb, comma } from '/src/lib/';

/* 디테일 페이지 타이틀 */
function setDocumentTitle(title) {
  document.title = title;
}

setDocumentTitle('마켓에몽 - 디테일');

/* 상품 선택 후 장바구니 담기 */
const hash = window.location.hash.slice(1);

const detailDesc = document.querySelector('section');

const detailList = await pb.collection('product').getFullList({
  filter: `id = "${hash}"`,
});

detailList.forEach(
  ({
    collectionId,
    id,
    name,
    price,
    photo,
    category,
    brand,
    label,
    weight,
    discount,
  }) => {
    const discountPrice = price - (price * discount) / 100;

    const template = /*html*/ `
  <div class="flex h-480pxr items-center bg-gray-100 p-20pxr">
          <img
            src="${getPbImageURL(collectionId, id, photo)}"
            alt="${name}"
            class="h-428pxr w-360pxr"
          />
        </div>
        <div class="detail-product-container w-560pxr flex-col flex-nowrap">
          <div class="detail-cart-wrapper">
            <div class="detail-title">
              <span class="text-21pxr font-bold text-gray-500">미래배송</span>
              <div>
                <h1 class="characterName mt-16pxr pb-4pxr text-28pxr font-semibold">
                  [${brand}]${name}
                </h1>
                <h2 class="mb-16pxr text-16pxr font-normal text-gray-400">
                ${label}
                </h2>
              </div>
              <div class="mb-16pxr">
                <span class="text-28pxr font-semibold">${comma(price)}</span>
                <span class="mb-20pxr font-normal">원</span>
              </div>
              <p class="mb-20pxr font-semibold text-skybluemong">
                로그인 후, 적립 혜택이 제공됩니다.
              </p>
            </div>
            <ul class="flex flex-col">
              <li
                class="flex border-t border-solid border-gray-100 px-4pxr py-16pxr text-12pxr font-semibold text-gray-500"
              >
                <dt class="w-128pxr">배송</dt>
                <dd>
                  <p>미래배송</p>
                  <p class="text-gray-400">
                    1초 만에 타임머신으로 배송이 옵니다.
                  </p>
                </dd>
              </li>
              <li
                class="flex border-t border-solid border-gray-100 px-4pxr py-16pxr text-12pxr font-semibold text-gray-500"
              >
                <dt class="w-128pxr">판매자</dt>
                <dd>
                  <span>에몽마켓</span>
                </dd>
              </li>
              <li
                class="flex border-t border-solid border-gray-100 px-4pxr py-16pxr text-12pxr font-semibold text-gray-500"
              >
                <dt class="w-128pxr">포장타입</dt>
                <dd>
                  <span>${category}</span>
                  <p class="whitespace-nowrap text-gray-400">
                    택배배송은 에코 포장이 스티로폼으로 대체됩니다.
                  </p>
                </dd>
              </li>
              <li
                class="flex border-t border-solid border-gray-100 px-4pxr py-16pxr text-12pxr font-semibold text-gray-500"
              >
                <dt class="w-128pxr">판매단위</dt>
                <dd>
                  <span>1개</span>
                </dd>
              </li>
              <li
                class="flex border-t border-solid border-gray-100 px-4pxr py-16pxr text-12pxr font-semibold text-gray-500"
              >
                <dt class="w-128pxr">중량/용량</dt>
                <dd>
                  <span>${weight}</span>
                </dd>
              </li>
              <li
                class="flex border-t border-solid border-gray-100 px-4pxr py-16pxr text-12pxr font-semibold text-gray-500"
              >
                <dt class="w-128pxr">주의사항</dt>
                <dd>
                  <span>상세페이지 별도표기</span>
                </dd>
              </li>
            </ul>
          </div>
          <div class="product detail-product-select">
            <div class="detail-select">
              <dl
                class="flex border-t border-solid border-gray-100 px-4pxr py-16pxr text-12pxr font-semibold text-gray-500"
              >
                <dt class="w-128pxr">상품선택</dt>
                <dd>
                  <div
                    class="select-option flex w-425pxr justify-between border border-solid border-gray-100 px-16pxr py-12pxr font-semibold text-gray-500"
                  >
                    <div class="flex flex-col gap-12pxr whitespace-nowrap">
                      <span>[${brand}]${name}</span>
                      <div
                        class="select-product-count mr-16pxr flex justify-between border border-gray-100 text-center font-semibold text-gray-500"
                      >
                        <button type="button" aria-label="수량내리기" disabled class="minus-button">
                          <img src="/src/assets/detail-Minus.svg" alt="빼기" />
                        </button>
                        <div class="count items-center text-16pxr">1</div>
                        <button type="button" aria-label="수량올리기" class="plus-button">
                          <img src="/src/assets/detail-Plus.svg" alt="더하기" />
                        </button>
                      </div>
                    </div>
                    <div
                      class="detail-select-count flex items-end whitespace-nowrap"
                    >
                      <span class="discount-price text-right font-bold pr-5pxr text-14pxr text-black"> ${comma(
                        discountPrice
                      )}원 </span>
                      <span class="cost-price line-through text-right text-sm text-gray-400">${comma(
                        price
                      )}원</span>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
            <div
              class="detail-price border-t border-solid border-gray-100 px-4pxr py-28pxr text-right"
            >
              <div
                class="flex items-end justify-end text-right text-16pxr font-semibold"
              >
                <span class="pr-17pxr font-semibold leading-5"
                  >총 상품금액:</span
                >
                <span class="pr-4pxr text-28pxr font-semibold leading-9"
                  >${comma(discountPrice)}</span
                >
                <span class="font-bold leading-8">원</span>
              </div>
              <div class="pt-10pxr text-16pxr">
                <span
                  class="gap-8pxr rounded-2xl bg-accent__yellow px-8pxr py-4pxr text-10pxr text-white"
                  >적립</span
                >
                <span class="text-16pxr font-semibold"
                  >로그인 후, 적립 혜택 제공</span
                >
              </div>
            </div>
            <div class="detail-add-cart flex w-560pxr justify-between">
              <button
                type="button"
                class="like-button flex h-54pxr w-54pxr items-center justify-center rounded-sm border border-gray-100 p-4pxr"
              >
                <img src="/src/assets/Heart.svg" alt="찜하기" class="w-36pxr" />
              </button>
              <button
                type="button"
                class="bell-button flex h-54pxr w-54pxr items-center justify-center rounded-sm border border-gray-100 p-4pxr"
              >
                <img src="/src/assets/Bell.svg" alt="재입고 알림" />
              </button>
              <button
                type="button"
                class="detail-cart-button radius-3 flex w-412pxr items-center justify-center rounded-sm bg-skybluemong text-16pxr font-semibold text-white hover:bg-bluemong"
              >
                <span>장바구니 담기</span>
              </button>
            </div>
          </div>
        </div>
`;
    detailDesc.insertAdjacentHTML('afterbegin', template);
  }
);

/* 상품 정보(설명) */
const detailInfo = document.querySelector('.detail-product-desc');

const detailInfoList = await pb.collection('product').getFullList({
  filter: `id = "${hash}"`,
});

detailInfoList.forEach(
  ({ collectionId, id, name, photo, brand, label, short_description }) => {
    const template = /*html*/ `
    <div class="detail-pic-desc" id="detail-pic-desc">
    <div class="detail-product-pic flex justify-center pb-76pxr">
      <img src="${getPbImageURL(collectionId, id, photo)}" alt="상품" />
    </div>
    <div class="detail-product-text">
      <h2 class="text-28pxr font-semibold">${label}</h2>
      <h3 class="pb-36pxr text-50pxr font-normal text-gray-800">
        [${brand}]${name}
      </h3>
      <p class="w-[1050px] border-t pt-28pxr text-16pxr font-normal">
      ${short_description}
      </p>
    </div>
  </div>
`;
    detailInfo.insertAdjacentHTML('afterbegin', template);
  }
);

/* 상품 정보(emong-point) */
const detailPoint = document.querySelector('.detail-point-text');

const checkPoint = await pb.collection('product').getFullList({
  filter: `id = "${hash}"`,
});

checkPoint.forEach(({ description, description2 }) => {
  const template = /*html*/ `
        <div class="pt-68pxr">
          <span class="text-23pxr">주의사항</span>
          <p class="pt-22pxr text-16pxr">
            ${description}
          </p>
        </div>
        <div class="pt-68pxr">
          <span class="text-23pxr">내구성</span>
          <p class="pt-22pxr text-16pxr  text-indent: 5px">
            ${description2}
          </p>
        </div>
    `;
  detailPoint.insertAdjacentHTML('afterbegin', template);
});

/* 상품 정보(사진) */
const detailPic = document.querySelector('.detail-p-info');

const InfoPic = await pb.collection('product').getFullList({
  filter: `id = "${hash}"`,
});

InfoPic.forEach(({ collectionId, id, photo_2 }) => {
  const template = /*html*/ `
  <div class="detail-img pb-72pxr">
    <img
      src="${getPbImageURL(collectionId, id, photo_2)}"
      alt="자세한크기 이미지"
    />
  </div>
`;
  detailPic.insertAdjacentHTML('afterbegin', template);
});

/* -------------------------------------------------------------------------- */
/*                               수량, 금액 변경                                */
/* -------------------------------------------------------------------------- */

function changeAmount(e) {
  e.preventDefault();

  const isPlusButton = e.target.classList.contains('.plus-button');
  const targetProduct = e.target.closest('.product');
  const targetCountElement = targetProduct.querySelector('.count');
  const priceElement = targetProduct.querySelector('.discount-price');
  const costPriceElement = targetProduct.querySelector('.cost-price');
  let currentCount = parseInt(targetCountElement.textContent);
  let discountPrice = parseInt(
    targetProduct.dataset.discountPrice?.replace(/,/g, '')
  );
  let costPrice = parseInt(targetProduct.dataset.costPrice?.replace(/,/g, ''));

  // 상품 금액
  if (!discountPrice) {
    discountPrice = parseInt(priceElement.textContent.replace(/,/g, ''));
    targetProduct.dataset.discountPrice = discountPrice;
  }

  if (!costPrice) {
    costPrice = parseInt(costPriceElement.textContent.replace(/,/g, ''));
    targetProduct.dataset.costPrice = costPrice;
  }

  // 상품 수량
  if (!isPlusButton && currentCount > 1) {
    currentCount -= 1;
  } else if (isPlusButton) {
    currentCount += 1;
  }

  targetCountElement.textContent = currentCount;
  priceElement.innerText = `${comma(discountPrice * currentCount)}원`;
  costPriceElement.innerText = `${comma(costPrice * currentCount)}원`;

  const minusButton = targetProduct.querySelector('.minus-button');
  minusButton.disabled = currentCount === 1;
}

const minusButton = document.querySelector('.minus-button');
minusButton.addEventListener('click', changeAmount);

const plusButton = document.querySelector('.plus-button');
plusButton.addEventListener('click', changeAmount);
