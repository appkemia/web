/* Examples
  maskCnpj(72565614000121)    => 72.565.614/0001-21
*/
import isPresent from 'utils/isPresent';

const maskCnpj = (value) => {
  let cnpj = value;

  if (isPresent(cnpj)) {
    cnpj = cnpj.toString();
    cnpj = cnpj
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1.$2.$3/$4-$5');
  }

  return cnpj;
};

export default maskCnpj;
