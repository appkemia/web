import isPresent from 'utils/isPresent';

const parseToString = (value) => {
  let string = value;
  if (isPresent(string)) {
    string = string.toString();
  }
  if (!isPresent(string)) {
    string = '';
  }

  return string;
};

export default parseToString;
