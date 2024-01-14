export default function comma(number) {
  number = Math.floor(number / 10) * 10;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
