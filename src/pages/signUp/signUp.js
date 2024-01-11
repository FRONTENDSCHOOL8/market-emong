// 동의 checkbox
const allAgree = document.querySelector('#allAgree');
const agreeList = document.querySelectorAll(`input[name="agree"]`);

function handleAllAgree(e) {
  agreeList.forEach((agree) => {
    agree.checked = e.target.checked;
  });
}
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
}

allAgree.addEventListener('click', handleAllAgree);

agreeList.forEach((agree) => {
  agree.addEventListener('click', handleAgree);
});
