import { pb } from '/src/lib';

const loginBtn = document.querySelector('.loginBtn');
const form = document.querySelector('#form');

function verifyBtnDisable() {
  const idField = document.querySelector('input[name="idField"]');
  const pwField = document.querySelector('input[name="pwField"]');
  // 표현식을 유의미한 이름을 가진 변수에 담아 보세요.
  const isValid = idField.value.length > 0 && pwField.value.length > 0

  // 코드를 자연어처럼 연출할 수 있게 됩니다.
  loginBtn.disabled = !isValid;
}

async function clickLoginBtn(e) {
  e.preventDefault();
  // TODO: 거의 다 왔습니다! 폼 안에서 값을 가져와 보세요!
  const formData = new FormData(e.currentTarget);
  const { idField, pwField } = Object.fromEntries(formData.entries());

  try {
    const userData = await pb
      .collection('users')
      .authWithPassword(idField, pwField);

    const data = await localStorage.getItem('pocketbase_auth');

    const { model, token } = JSON.parse(data);

    const authData = {
      isAuth: !!model,
      user: model,
      token: token,
    };

    await localStorage.setItem('userAuth', JSON.stringify(authData));

    alert('로그인 완료 - 메인 페이지로 이동합니다.');

    window.location.href = '/index.html';
  } catch {
    alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
  }
}

const idField = document.querySelector('input[name="idField"]');
const pwField = document.querySelector('input[name="pwField"]');
idField.addEventListener('input', verifyBtnDisable);
pwField.addEventListener('input', verifyBtnDisable);
form.addEventListener('submit', clickLoginBtn);
