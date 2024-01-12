export default function validatePw(text) {
  const reg =
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=].{10,}$/;

  return reg.test(String(text).toLowerCase());
}
