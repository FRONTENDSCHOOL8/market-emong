/**
 * pocketbase에서 이미지 src 값을 반환하는 함수
 * @param {string} collectionId
 * @param {string} id
 * @param {string} fileName  "photo로 default"
 * @returns pocketbase 이미지 src 값 반환
 */

export default function getPbImageURL(collectionId, id, fileName = `photo`) {
  return `${
    import.meta.env.VITE_PB_API
  }/files/${collectionId}/${id}/${fileName}`;
}
