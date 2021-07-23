

export const generateSerialCard = (iter, month, year) => {
  const iterD = ("0000" + (+iter).toString(16)).substr(-4);
  const monthD = ("0000" + (+month).toString(16)).substr(-4);
  const yearD = ("0000" + (+year).toString(16)).substr(-4);
  return `D1D1-${iterD}-${monthD}-${yearD}`
}