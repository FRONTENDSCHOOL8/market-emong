export default function validateDay(text) {
  const reg = /^(0[1-9]|3[01]|[12][0-9]|[1-9])$/;

  return reg.test(String(text).toLowerCase());
}
