import PocketBase from 'pocketbase';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '/src/styles/tailwind.css';

// const pb = new PocketBase('http://market-emong.pockethost.io');
// const cProductImg = document.querySelector('.swiper-wrapper');

// function getPbImageURL(collectionId, id, fileName = 'photo') {
//   return `https://market-emong.pockethost.io/api/files/${collectionId}/${id}/${fileName}`;
// }

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  // 보여지는 슬라이드 수
  slidesPerView: 2,
  // 센터 모드
  centeredSlides: true,
  // 해당 슬라이드 클릭시 슬라이드 위치로 이동
  slideToClickedSlide: true,
  // (false-스와이핑안됨)버튼으로만 슬라이드 조작이 가능
  allowTouchMove: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
