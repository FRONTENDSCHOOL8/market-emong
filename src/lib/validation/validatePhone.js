export default function validatePhone(text) {
  const reg = /^[0-9]{10,11}$/;

  return reg.test(String(text).toLowerCase());
}
