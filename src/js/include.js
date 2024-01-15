fetch('/src/components/header.html')
  .then((res) => res.text())
  .then((data) => {
    const header = document.querySelector('header');
    header.innerHTML = data;
    return import('/src/js/header.js');
  })
  .catch((error) => {
    console.error(error);
  });

fetch('/src/components/footer.html')
  .then((res) => res.text())
  .then((data) => {
    const footer = document.querySelector('footer');
    footer.innerHTML = data;
  });

// fetch('/src/components/recently.html')
//   .then((res) => res.text())
//   .then((data) => {
//     const recently = document.querySelector('.recently-swiper');
//     recently.innerHTML = data;
//     return import('/src/js/recently.js');
//   });
// fetch('/src/components/recently.html')
//   .then((res) => res.text())
//   .then((data) => {
//     const recentlySwiper = document.querySelector('.recently-swiper');
//     recentlySwiper.innerHTML = data;
//     return import('/src/js/recently.js');
//   });
