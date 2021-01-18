/**
 * Round values
 *
 * @param Float val:       a float value or string
 * @param Int   precision: output precision (Default: 2)

 Example:
  round( '10.1234', 3 ) => 10.123
  round( '10.1899', 2 ) => 10.19
  round( 1.899,     0 ) => 2
 */
import toFloat from './toFloat';

export default (val, precision=2) => {
  const _precision = Math.pow(10, parseInt(precision, 10) );
  const num        = toFloat(val);
  return ( Math.round(num*_precision) / _precision );
};
