// 스와이퍼 import
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

// 스와이퍼 기능 구현
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
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
});
