export default function beforeComma(text) {
  const words = text.split(',');
  let result = '';
  for (let i = 0; i < words.length; i++) {
    if (i === words.length - 1) {
      words[i] = words[i].slice(0, -1);
    }
    result = result + words[i];
  }

  return Number(result);
}
