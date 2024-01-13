export default function validateEmail(text) {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

  return reg.test(String(text).toLowerCase());
}
