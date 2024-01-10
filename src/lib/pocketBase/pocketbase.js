// pb를 함수 변수로 빼줘서 pb만 불러와 사용하면 됩니다.

import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export default pb;
