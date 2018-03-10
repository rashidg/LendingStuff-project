export function isEmpty(str) {
  return (!str || 0 === str.length);
}

export function validateNumber(str) {
  var retNum = parseInt(str);

  if (retNum.isNaN) return false;
  else return retNum;
}