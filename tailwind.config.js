// 선영님이 주신 코드

import { range } from 'lodash';
const pxToRem = (px, base = 16) => `${px / base}rem`;

const pxToRemFunc = (start, end) => {
  return range(start, end).reduce((acc, px) => {
    acc[`${px}pxr`] = pxToRem(px);
    return acc;
  }, {});
};

// 타입을 지정하고 싶은 객체 바로 위에 타입스크립트 구문이 포함된 jsdoc 주석을 써 주셔야 타입스크립트의 지원을 받을 수 있습니다,
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/components/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    extend: {
      spacing: {
        ...pxToRemFunc(0, 1000),
      }, // px을 rem으로 변환
      inset: {
        ...pxToRemFunc(0, 1000),
      },
      fontSize: {
        ...pxToRemFunc(0, 1000),
      }, // px을 rem으로 변환
      lineHeight: {
        ...pxToRemFunc(0, 1000),
      }, // px을 rem으로 변환
      screens: {
        mobile: '360px',
        tablet: '768px',
        desktop: '1280px',
      },
      colors: {
        secondary: 'rgba(189, 118, 255, 1)',
        primary: 'rgba(95, 0, 128, 1)',
        content: 'rgba(51, 51, 51, 1)',
        accent__yellow: 'rgba(250, 98, 47, 1)',
        info__error: 'rgba(240, 63, 64, 1)',
        bluemong: 'rgb(2, 152, 228)',
        skybluemong: 'rgb(104, 195, 241)',
      },
      colors: {
        secondary: 'rgba(189, 118, 255, 1)',
        primary: 'rgba(95, 0, 128, 1)',
        content: 'rgba(51, 51, 51, 1)',
        accent__yellow: 'rgba(250, 98, 47, 1)',
        info__error: 'rgba(240, 63, 64, 1)',
        bluemong: 'rgb(2, 152, 228)',
        skybluemong: 'rgb(104, 195, 241)',
      },
    },
    fontFamily: {
      sans: ['Pretendard-Regular', 'noto-sans-kr', 'sans-serif'],
    }, // font-family: noto-sans-kr, sans-serif;
  },
  plugins: [],
};
