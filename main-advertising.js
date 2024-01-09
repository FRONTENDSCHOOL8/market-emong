import PocketBase from 'pocketbase';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './src/styles/tailwind.css';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const advertisingImg = document.querySelector('.swiper-wrapper');

function getPbImageURL(collectionId, id, fileName = 'photo') {
  return `${
    import.meta.env.VITE_PB_API
  }/files/${collectionId}/${id}/${fileName}`;
}

// you can also fetch all records at once via getFullList
const records = await pb.collection('advertisement').getFullList({
  sort: '-created',
});
// console.log(records);

// * html에 있는 광고판들을 데이터베이스에서 가져온 함수.
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

// &스와이퍼 기능 구현
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
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
});

// &팝업창 기능 구현

// *변수 지정
const dialog = document.querySelector('#dialog');
const todayBtn = document.querySelector('.todayButton');
const closeBtn = document.querySelector('.closeButton');

if (getStorage('day') || localStorage.getItem('day') === null) {
  dialog.showModal();
}

function setStorage(name) {
  const date = new Date();

  // const timer = '6'; // test
  const timer = date.setTime(date.getDay());

  localStorage.setItem(name, timer);
}

function getStorage(name) {
  const now = new Date();

  // const timer = '0'; // test
  const timer = now.setTime(now.getDay());

  if (parseInt(localStorage.getItem(name)) !== timer) {
    localStorage.removeItem(name);
  }

  return parseInt(localStorage.getItem(name)) !== timer;
}

function handlePopup() {
  setStorage('day');
  dialog.close();
}

todayBtn.addEventListener('click', handlePopup);

// *닫기 버튼 눌렀을때 닫아지는 클릭 이벤트 함수

closeBtn.addEventListener('click', () => {
  dialog.close();
});
