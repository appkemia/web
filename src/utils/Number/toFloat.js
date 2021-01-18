/**
 * Convert any value to Float
 *
 * @param any v: any value
 Example:
  toFloat( null )      => 0
  toFloat( undefined ) => 0
  toFloat( {} )        => 0
  toFloat( '1.89' )    => 1.89
 */
export default (v) => {
  let val;
  try {
    val = parseFloat(v);
    if ( isNaN(val) ) { val = 0.0; }
  } catch (e) {
    val = 0.0;
  }

  return val;
};
