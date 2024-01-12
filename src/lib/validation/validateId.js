export default function validateId(text) {
  const reg = /^[a-zA-Z0-9]{6,16}$/;

  return reg.test(String(text).toLowerCase());
}
