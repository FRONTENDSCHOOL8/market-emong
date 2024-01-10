const { localStorage: storage } = window;
/**
 * localStorage에 저장된 key의 요일과 현재 요일을 비교해서 boolean을 반환하는 함수
 * @param {string} key
 * @returns 요일이 지났는지 true false 반환
 */
export default function compareDay(key) {
  const now = new Date();

  const timer = now.setTime(now.getDay());

  return new Promise((resolve, reject) => {
    if (typeof key === 'string' && parseInt(storage.getItem(key)) !== null) {
      if (parseInt(storage.getItem(key)) !== timer) {
        storage.removeItem(key);
      }
      resolve(parseInt(storage.getItem(key)) !== timer);
    } else if (parseInt(storage.getItem(key)) === null) {
      reject({ message: `${key}에 저장된 값이 없습니다.` });
    } else {
      reject({ message: 'compareDay의 인자는 문자 타입이어야 합니다.' });
    }
  });
}
