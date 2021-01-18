/*
  Formata um valor float adicionado o separador de casa decimal com virgula
  Exemplo:
  * formatNumber( 1520.897, {precision: 2} ) => "1.520,90"
  * formatNumber( 1520.897, {precision: 3} ) => "1.520,897"
  * formatNumber( 1520.8,   {precision: 2} ) => "1.520,80"
  * formatNumber( 1520.89,  {precision: 3} ) => "1.520,890"
*/

import round from './round';

const _default = {
  precision: 2,
};

const formatNumber = (number, options={}) => {
  const opts = { ..._default, ...options };
  const num = round( number, opts.precision );
  return num.toLocaleString('pt-BR', {maximumFractionDigits: opts.precision, minimumFractionDigits: opts.precision});
};

export default formatNumber;