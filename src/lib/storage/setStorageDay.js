const { localStorage: storage } = window;

/**
 * localStorage에 key에 현재 요일 저장, 일 \~ 월 / 0 \~ 6
 * @param {string} key 현재 요일을 저장할 key
 *
 */

export default function setStorageDay(key) {
  const date = new Date();
  const timer = date.setTime(date.getDay());

  return new Promise((resolve, reject) => {
    if (typeof key === 'string') {
      storage.setItem(key, timer);
      resolve();
    } else {
      reject({ message: 'setStorageDay의 인자는 문자 타입이어야 합니다.' });
    }
  });
}
