import { pb } from '/src/lib';

const idField = document.querySelector('input[name="idField"]');
const pwField = document.querySelector('input[name="pwField"]');
const loginBtn = document.querySelector('.loginBtn');

function verifyBtnDisable() {
  if (idField.value.length > 0 && pwField.value.length > 0) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

async function clickLoginBtn(e) {
  e.preventDefault();
  const idValue = idField.value;
  const pwValue = pwField.value;

  try {
    const userData = await pb
      .collection('users')
      .authWithPassword(idValue, pwValue);

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

idField.addEventListener('input', verifyBtnDisable);
pwField.addEventListener('input', verifyBtnDisable);
loginBtn.addEventListener('click', clickLoginBtn);
