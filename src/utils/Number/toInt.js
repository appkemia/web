/**
 * Convert any value to Integer
 * Default: 0
 *
 * @param any v: any value
 Example:
  toInt( null )      => 0
  toInt( undefined ) => 0
  toInt( {} )        => 0
  toInt( '1.89' )    => 2
 */
import round from './round';

export default v => round(v, 0);
