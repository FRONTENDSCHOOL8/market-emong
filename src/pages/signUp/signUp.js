// import daum from '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
import {
  pb,
  validateId,
  validatePw,
  validateEmail,
  validatePhone,
  validateYear,
  validateMonth,
  validateDay,
} from '/src/lib/';

// 회원가입 input Tags

const idField = document.querySelector('input[name="idField"]');
const pwField = document.querySelector('input[name="pwField"]');
const pwCheckField = document.querySelector('input[name="pwCheckField"]');
const nameField = document.querySelector('input[name="nameField"]');
const emailField = document.querySelector('input[name="emailField"]');
const phoneNumField = document.querySelector('input[name="phoneNumField"]');
// const mainAddress = document.querySelector('input[name="mainAddress"]');
// const subAddress = document.querySelector('input[name="subAddress"]');
const addressBtn = document.querySelector('.adressBtn');
const genderRadio = document.querySelectorAll('input[name="gender"]');
const birthField = document.querySelectorAll('input[name="birthday"]');
const valiBirthText = document.querySelector('.valiBirthText');
const extraRadio = document.querySelectorAll('input[name="extra"]');
const joinBtn = document.querySelector('.joinBtn');
const idDuplicateBtn = document.querySelector('.idDuplicateBtn');
const emailDuplicateBtn = document.querySelector('.emailDuplicateBtn');
const verify = {
  verifyId: false,
  verifyPw: false,
  verifyPwCheck: false,
  verifyName: false,
  verifyEmail: false,
  verifyPhone: false,
  agree_1: false,
  agree_2: false,
  agree_4: false,
};

function checkAllVerify() {
  return (
    verify.verifyId &&
    verify.verifyPw &&
    verify.verifyPwCheck &&
    verify.verifyName &&
    verify.verifyEmail &&
    verify.verifyPhone &&
    verify.agree_1 &&
    verify.agree_2 &&
    verify.agree_4
  );
}

// 주소 찾기

// function searchAddress() {
//   new daum.Postcode({
//     oncomplete: function (data) {
//       // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

//       // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
//       // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
//       var roadAddr = data.roadAddress; // 도로명 주소 변수
//       var extraRoadAddr = ''; // 참고 항목 변수

//       // 법정동명이 있을 경우 추가한다. (법정리는 제외)
//       // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
//       if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
//         extraRoadAddr += data.bname;
//       }
//       // 건물명이 있고, 공동주택일 경우 추가한다.
//       if (data.buildingName !== '' && data.apartment === 'Y') {
//         extraRoadAddr +=
//           extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
//       }
//       // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
//       if (extraRoadAddr !== '') {
//         extraRoadAddr = ' (' + extraRoadAddr + ')';
//       }

//       // 우편번호와 주소 정보를 해당 필드에 넣는다.
//       document.getElementById('sample4_postcode').value = data.zonecode;
//       document.getElementById('sample4_roadAddress').value = roadAddr;
//       document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

//       // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
//       if (roadAddr !== '') {
//         document.getElementById('sample4_extraAddress').value = extraRoadAddr;
//       } else {
//         document.getElementById('sample4_extraAddress').value = '';
//       }

//       var guideTextBox = document.getElementById('guide');
//       // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
//       if (data.autoRoadAddress) {
//         var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
//         guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
//         guideTextBox.style.display = 'block';
//       } else if (data.autoJibunAddress) {
//         var expJibunAddr = data.autoJibunAddress;
//         guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
//         guideTextBox.style.display = 'block';
//       } else {
//         guideTextBox.innerHTML = '';
//         guideTextBox.style.display = 'none';
//       }
//     },
//   }).open();
// }

// addressBtn.addEventListener('click', searchAddress);

// id duplicate btn event
async function duplicateID(e) {
  e.preventDefault();

  const usernameList = [];

  try {
    const userData = await pb.collection('users').getFullList();

    userData.forEach((userData) => {
      usernameList.push(userData.username);
    });

    const valid = usernameList.some((data) => data === idField.value);

    if (!valid) {
      verify.verifyId = true;
      idField.nextElementSibling.style.display = 'inline';
      idField.nextElementSibling.style.color = 'green';
      idField.nextElementSibling.textContent = '사용 가능한 아이디입니다.';
    } else {
      verify.verifyId = false;
      idField.nextElementSibling.style.display = 'inline';
      idField.nextElementSibling.textContent = '중복된 아이디입니다.';
    }

    if (checkAllVerify(verify)) {
      joinBtn.disabled = false;
    } else if (!checkAllVerify(verify)) {
      joinBtn.disabled = true;
    }
  } catch {
    alert('서버 오류로 중복 확인에 실패했습니다..');
  }
}

idDuplicateBtn.addEventListener('click', duplicateID);

// email duplicate btn event

async function duplicateEmail(e) {
  e.preventDefault();

  const userEmailList = [];

  try {
    const userData = await pb.collection('users').getFullList();

    userData.forEach((userData) => {
      userEmailList.push(userData.email);
    });

    const valid = userEmailList.some((data) => data === emailField.value);

    if (!valid) {
      verify.verifyEmail = true;
      emailField.nextElementSibling.style.display = 'inline';
      emailField.nextElementSibling.style.color = 'green';
      emailField.nextElementSibling.textContent = '사용 가능한 이메일입니다.';
    } else {
      verify.verifyEmail = false;
      emailField.nextElementSibling.style.display = 'inline';
      emailField.nextElementSibling.textContent = '이미 사용중인 이메일입니다.';
    }

    if (checkAllVerify(verify)) {
      joinBtn.disabled = false;
    } else if (!checkAllVerify(verify)) {
      joinBtn.disabled = true;
    }
  } catch {
    alert('서버 오류로 중복 확인에 실패했습니다..');
  }
}

emailDuplicateBtn.addEventListener('click', duplicateEmail);

// id event

function verifyId(e) {
  const validation = validateId(e.target.value);
  if (!validation) {
    idField.nextElementSibling.style.display = 'inline';
    idField.nextElementSibling.textContent =
      '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
    idDuplicateBtn.disabled = true;
  } else {
    idField.nextElementSibling.style.display = 'none';
    idDuplicateBtn.disabled = false;
  }
}

idField.addEventListener('input', verifyId);

// pw event

function verifyPw(e) {
  const validation = validatePw(e.target.value);
  if (e.target.value.length < 10) {
    pwField.nextElementSibling.textContent = '최소 10자 이상 입력';
  } else if (e.target.value.length >= 10) {
    pwField.nextElementSibling.textContent =
      '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
  }
  if (!validation) {
    pwField.nextElementSibling.style.display = 'inline';
    verify.verifyPw = false;
  } else {
    pwField.nextElementSibling.style.display = 'none';
    verify.verifyPw = true;
  }
  if (checkAllVerify()) {
    joinBtn.disabled = false;
  } else if (!checkAllVerify()) {
    joinBtn.disabled = true;
  }
}

pwField.addEventListener('input', verifyPw);

// pwCheck event

function verifyPwCheck(e) {
  if (e.target.value === '') {
    pwCheckField.nextElementSibling.textContent =
      '비밀번호를 한번 더 입력해 주세요.';
    pwCheckField.nextElementSibling.style.display = 'inline';
    verify.verifyPwCheck = false;
  } else if (e.target.value !== '' && e.target.value !== pwField.value) {
    pwCheckField.nextElementSibling.textContent = '동일한 비밀번호를 입력';
    pwCheckField.nextElementSibling.style.display = 'inline';
    verify.verifyPwCheck = false;
  } else if (e.target.value !== '' && e.target.value === pwField.value) {
    pwCheckField.nextElementSibling.style.display = 'none';
    verify.verifyPwCheck = true;
  }
  if (checkAllVerify()) {
    joinBtn.disabled = false;
  } else if (!checkAllVerify()) {
    joinBtn.disabled = true;
  }
}

pwCheckField.addEventListener('input', verifyPwCheck);

// name event

function verifyName(e) {
  if (e.target.value === '') {
    nameField.nextElementSibling.style.display = 'inline';
    verify.verifyName = false;
  } else {
    nameField.nextElementSibling.style.display = 'none';
    verify.verifyName = true;
  }
  if (checkAllVerify()) {
    joinBtn.disabled = false;
  } else if (!checkAllVerify()) {
    joinBtn.disabled = true;
  }
}

nameField.addEventListener('input', verifyName);

// email event

function verifyEmail(e) {
  const validation = validateEmail(e.target.value);
  if (!validation) {
    emailField.nextElementSibling.style.display = 'inline';
    emailField.nextElementSibling.textContent =
      '이메일 형식으로 입력해 주세요.';
    emailDuplicateBtn.disabled = true;
  } else {
    emailField.nextElementSibling.style.display = 'none';
    emailDuplicateBtn.disabled = false;
  }
}

emailField.addEventListener('input', verifyEmail);

// phoneNum event

function verifyPhone(e) {
  const button = document.querySelector('.phoneBtn');
  const validation = validatePhone(e.target.value);
  if (!validation) {
    phoneNumField.nextElementSibling.style.display = 'inline';
    button.disabled = true;
    verify.verifyPhone = false;
  } else {
    phoneNumField.nextElementSibling.style.display = 'none';
    button.disabled = false;
    verify.verifyPhone = true;
  }
  if (checkAllVerify()) {
    joinBtn.disabled = false;
  } else if (!checkAllVerify()) {
    joinBtn.disabled = true;
  }
}

phoneNumField.addEventListener('input', verifyPhone);

let gender;
// gender radio event
function getGender(e) {
  gender = e.target.value;
}

genderRadio.forEach((radio) => {
  radio.addEventListener('click', getGender);
});

// birthday event
function verifyBirth(e) {
  const target = e.target;

  if (
    target.id === 'year' &&
    !validateYear(target.value) &&
    target.value !== ''
  ) {
    valiBirthText.style.display = 'inline';
    valiBirthText.textContent = '태어난 년도 4자리를 정확하게 입력해주세요.';
  } else if (
    target.id === 'year' &&
    validateYear(target.value) &&
    target.value !== ''
  ) {
    valiBirthText.style.display = 'inline';
    valiBirthText.textContent = '생년월일을 다시 확인해주세요.';
  } else if (
    target.id === 'month' &&
    !validateMonth(target.value) &&
    target.value !== ''
  ) {
    valiBirthText.style.display = 'inline';
    valiBirthText.textContent = '태어난 월을 정확하게 입력해주세요.';
  } else if (
    target.id === 'month' &&
    validateMonth(target.value) &&
    target.value !== ''
  ) {
    valiBirthText.style.display = 'inline';
    valiBirthText.textContent = '생년월일을 다시 확인해주세요.';
  } else if (
    target.id === 'day' &&
    !validateDay(target.value) &&
    target.value !== ''
  ) {
    valiBirthText.style.display = 'inline';
    valiBirthText.textContent = '태어난 일을 정확하게 입력해주세요.';
  } else if (
    target.id === 'day' &&
    validateDay(target.value) &&
    target.value !== ''
  ) {
    valiBirthText.style.display = 'none';
  }
}

birthField.forEach((input) => {
  input.addEventListener('input', verifyBirth);
});
let extra;
// extra radio event
function getExtra(e) {
  extra = e.target.value;
}

extraRadio.forEach((radio) => {
  radio.addEventListener('click', getExtra);
});

// 동의 checkbox
const allAgree = document.querySelector('#allAgree');
const agreeList = document.querySelectorAll(`input[name="agree"]`);

function handleAllAgree(e) {
  agreeList.forEach((agree) => {
    agree.checked = e.target.checked;
  });
  verify.agree_1 = agreeList[0].checked;
  verify.agree_2 = agreeList[1].checked;
  verify.agree_4 = agreeList[3].checked;
  if (checkAllVerify()) {
    joinBtn.disabled = false;
  } else if (!checkAllVerify()) {
    joinBtn.disabled = true;
  }
  console.log(checkAllVerify());
}

allAgree.addEventListener('click', handleAllAgree);

function handleAgree(e) {
  if (!e.target.checked) {
    allAgree.checked = false;
  }
  let bool = e.target.checked;
  agreeList.forEach((agree) => {
    if (agree.checked === false) {
      bool = false;
    }
  });
  if (bool) {
    allAgree.checked = true;
  }
  verify.agree_1 = agreeList[0].checked;
  verify.agree_2 = agreeList[1].checked;
  verify.agree_4 = agreeList[3].checked;

  if (checkAllVerify()) {
    joinBtn.disabled = false;
  } else if (!checkAllVerify()) {
    joinBtn.disabled = true;
  }
}

agreeList.forEach((agree) => {
  agree.addEventListener('click', handleAgree);
});

// join button event
/* 
idField       : 아이디
pwField       : 비밀번호
nameField     : 이름
emailField    : 이메일
phoneNumField : 전화번호
genderRadio?  : 성별
birthField    : 생년월일
extraRadio    : 추가 사항
agree_1       : 동의 사항 1
agree_2       : 동의 사항 2
agree_3       : 동의 사항 3
agree_4       : 동의 사항 4
*/

async function makeUserData(e) {
  e.preventDefault();
  const data = {
    username: idField.value,
    password: pwField.value,
    passwordConfirm: pwField.value,
    email: emailField.value,
    name: nameField.value,
    phone: phoneNumField.value,
    gender: gender,
    extra: extra,
    agree_1: agreeList[0].checked,
    agree_2: agreeList[1].checked,
    agree_3: agreeList[2].checked,
    agree_4: agreeList[3].checked,
    birthday:
      birthField[0].value +
      '/' +
      birthField[1].value +
      '/' +
      birthField[2].value,
  };

  const record = await pb.collection('users').create(data);

  location.href = '/src/pages/login/';
}

joinBtn.addEventListener('click', makeUserData);
