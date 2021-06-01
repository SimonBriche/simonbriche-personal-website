module.exports = {
  /**
   * Returns a random integer between two integers.
   * @param {number} min - Minimum integer
   * @param {number} max - Maximum integer
   * @returns A random integer between min and max
   */
  randomBetween: function(min, max){
    return Math.ceil(max - Math.random()*(max - (min - 1)));
  },
  /**
   * Returns a randmon string of wanted length.
   * @param {string} length - The length of the wanted string
   * @returns A random string of the requested length
   */
  randomString: function (length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i){
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  },
  /**
   * Convert all undefined values of an object to null.
   * @param {Object} obj - The object to convert
   * @returns An object without undefined values.
   */
  safeUndefined: function(obj){
    const newObj = {};
    Object.keys(obj).forEach(key => {
      newObj[key] = (obj[key] === undefined) ? null : obj[key];
    });
    return newObj;
  }
}