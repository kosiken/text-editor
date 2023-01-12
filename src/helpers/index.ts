export function reduceString(text: string, length = 10): string {
    return text.length > length ? text.substring(0, length - 3) + '...' : text
}

/**
 * 
 * @param numberString String value of a number
 * @returns A comma seperated string value of the number
 */
export function putCommas(numberString: string) {
    if (numberString.length < 4) {
      return numberString;
    }
    const numberPattern = /^\d+$/;
    const chars = numberString.split('');
    const len = chars.length - 1;
    let counter = 0;
    const numberWithCommas = [];
    for (let i = len; i > -1; i--) {
      if (counter > 0 && counter % 3 === 0) {
        numberWithCommas.push(',');
      }
      if (numberPattern.test(chars[i])) {
        numberWithCommas.push(chars[i]);
        counter++;
      }
    }
    return numberWithCommas.reverse().join('');
  }

/**
 * 
 * @param numString Number to put in 2 decimal places
 * @param withCommas Indicate if the returned value should be comma seperated
 * @returns string - The value in two decimal places
 */
export function to2DecimalPlaces(numString: string | number, withCommas = false): string {
    let _number =
      typeof numString === 'string' ? parseFloat(numString) : numString;
    if(isNaN(_number)) {
      // Cant represent invalid numbers
      return numString as string;
    }
    _number = Math.round((_number + Number.EPSILON) * 100) / 100;
    const ans = _number.toFixed(2);
    if (!withCommas) {
      return ans;
    } else {
      const values = ans.split('.');
      if (values.length === 1) {
        return values[0];
      }
      return `${putCommas(values[0])}.${values[1]}`;
    }
  }
  