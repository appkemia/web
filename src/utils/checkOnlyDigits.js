const checkOnlyDigits = (value) => {

  const isNum = /^\d+$/.test(value);

  return isNum;
};

export default checkOnlyDigits;
