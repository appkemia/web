import isPresent from 'utils/isPresent';

const onlyNumbers = (value) => {
  let number = value;
  if (isPresent(number)) {
    number = number.toString();
    number = number.replace(/[^\d]/g, '');
    // .replace(/\D/g, '')
  }
  if (!isPresent(number)) {
    number = '';
  }

  return number;
};

export default onlyNumbers;
