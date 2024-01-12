export default function validateYear(text) {
  const reg = /^(19[2-9][4-9]|20[0-1][0-9]|202[0-4])$/;

  return reg.test(String(text).toLowerCase());
}
