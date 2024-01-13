import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '/src/styles/tailwind.css';
import '/src/styles/product.css';

// 최근본 상품 swiper

const recentSwiper = new Swiper('.recently-container', {
  direction: 'vertical',
  resistance: true,
  allowTouchMove: false,
  slidesPerView: 2.5,
  spaceBetween: 4,
  navigation: {
    nextEl: '.recently-prev',
    prevEl: '.recently-next',
  },
  keyboard: {
    enabled: true,
  },
});
