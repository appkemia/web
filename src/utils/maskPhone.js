/* Examples
  maskPhone(49933333333)   => (49) 9 3333-3333
*/
import isPresent from 'utils/isPresent';

const maskPhone = (value) => {
  let phone = value;
  if (isPresent(phone)) {
    phone = phone.toString();
    phone = phone.replace(/\D/g, '');
    phone = phone.replace(/^(\d)/, '($1');
    phone = phone.replace(/(.{3})(\d)/, '$1) $2');
    if (phone.length > 6) {
      phone = phone.replace(/(.{5})(\d)/, '$1$2 ');
    }
    if (phone.length === 12) {
      phone = phone.replace(/(.{1})$/, '-$1');
    } else if (phone.length === 13) {
      phone = phone.replace(/(.{2})$/, '-$1');
    } else if (phone.length === 14) {
      phone = phone.replace(/(.{3})$/, '-$1');
    } else if (phone.length === 15) {
      phone = phone.replace(/(.{4})$/, '-$1');
    } else if (phone.length === 16) {
      phone = phone.replace(/(.{5})$/, '-$1');
    }
    phone = phone.replace(/(-\d{4})\d+?$/, '$1');

    // if (phone.length === 10) {
    //   phone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    // } else if (phone.length === 11) {
    //   phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    // } else if (phone.length === 12) {
    //   phone = phone.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
    // } else if (phone.length === 13) {
    //   phone = phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
    // }
  }

  return phone;
};

export default maskPhone;
