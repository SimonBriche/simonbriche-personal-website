module.exports = {
  /**
   * Apply JSON.parse to all the target's values whose which key is in the "keys" array.
   * @param {Object[]|Object} target An object or an array of objects
   * @param {string[]} keys An array of the target's keys that needs to be parsed
   * @returns The target object
   */
  parseKeys: function(target, keys){
    const targetArray = (Array.isArray(target)) ? target : [target];
    targetArray.forEach(item => {
      Object.keys(item).map(key => {
        if(keys.indexOf(key) !== -1){
          try{
            item[key] = JSON.parse(item[key]);
          }
          catch(e){
            _logger.error('fail to parseKeys', key, e);
          }
        }
      });
    });
  },
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
  },
  /**
   * Overwrites target's values with source's and adds source's if non existent in target
   * @param {Object} target - The target object 
   * @param {Object} source - The source object
   * @returns An object with properties of both objects. Doesn't mutate target or source.
   */
  mergeObjects: function(target, source){
    let result = {};
    for (let attrname in target) { result[attrname] = target[attrname]; }
    for (let attrname in source) { result[attrname] = source[attrname]; }
    return result;
  },
  /**
   * Overwrites target's values with source's and adds source's if non existent in target
   * @param {Object} target - The target object 
   * @param {Object} source - The source object
   * @param {Boolean} isMergingArrays - If set to true, will have any source array's elements overwrite those of the target array at the same index. If false (default) will replace source array's with target array's
   * @returns An object with properties of both objects. Doesn't mutate target or source.
   */
  mergeDeepObjects: function(target, source, isMergingArrays = false){
    target = ((obj) => {
      let cloneObj;
      try {
        cloneObj = JSON.parse(JSON.stringify(obj));
      } catch(err) {
        // If the stringify fails due to circular reference, the merge defaults
        // to a less-safe assignment that may still mutate elements in the target.
        // You can change this part to throw an error for a truly safe deep merge.
        cloneObj = Object.assign({}, obj);
      }
      return cloneObj;
    })(target);

    const isObject = (obj) => obj && typeof obj === "object";

    if (!isObject(target) || !isObject(source)){
      return source;
    }
    console.log('this', this)
    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];
      
      if(Array.isArray(targetValue) && Array.isArray(sourceValue)){
        if(isMergingArrays) {
          target[key] = targetValue.map((x, i) => sourceValue.length <= i ? x : this.mergeDeepObjects(x, sourceValue[i],isMergingArrays));
          if(sourceValue.length > targetValue.length){
            target[key] = target[key].concat(sourceValue.slice(targetValue.length));
          }
        } else {
          target[key] = sourceValue;
        }
      }
      else if(isObject(targetValue) && isObject(sourceValue)){
        target[key] = this.mergeDeepObjects(Object.assign({}, targetValue), sourceValue, isMergingArrays);
      }
      else{
        target[key] = sourceValue;
      }
    });

    return target;
  }
}