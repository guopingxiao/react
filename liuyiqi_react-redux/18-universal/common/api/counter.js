/**
 * 产生 min-max之间的随机数整数
 * @param {*} min 
 * @param {*} max 
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function fetchCounter(callback) {
  setTimeout(() => {
    callback(getRandomInt(1, 100));
  }, 500);
}
