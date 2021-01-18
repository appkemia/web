/* Examples
  maskCpf(99999999999)    => 999.999.999-99
*/
import isPresent from 'utils/isPresent';

const maskCpf = (value) => {
  let cpf = value;

  if (isPresent(cpf)) {
    cpf = cpf.toString();
    cpf = cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

    // cpf = cpf.replace(/^(\d{3})(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4');
  }

  return cpf;
};

export default maskCpf;
