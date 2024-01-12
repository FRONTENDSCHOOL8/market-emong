export default function validateMonth(text) {
  const reg = /^(0[1-9]|1[0-2]|[1-9])$/;

  return reg.test(String(text).toLowerCase());
}
