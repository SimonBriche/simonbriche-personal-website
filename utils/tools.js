const v8 = require('v8');
const got = require('got');

module.exports = {
  /**
   * Apply JSON.parse to all the target's values whose which key is in the "keys" array. It mutates the target object.
   * @param {Object[]|Object} target An object or an array of objects
   * @param {string[]} keys An array of the target's keys that needs to be parsed
   * @returns {Object} An object with a "parsed" property that contains all the keys that has been parsed, and a "failed" property with the key that hasn't been parsed, along with the error.
   */
  parseKeys: function(target, keys){
    const parsedKeys = [];
    const failedKeys = [];
    if(Array.isArray(keys) && keys.length > 0){
      const targetArray = (Array.isArray(target)) ? target : [target];
      targetArray.forEach(item => {
        Object.keys(item).map(key => {
          if(keys.indexOf(key) !== -1){
            try{
              item[key] = JSON.parse(item[key]);
              parsedKeys.push(key);
            }
            catch(e){
              failedKeys.push({key: key, error: e});
            }
          }
        });
      });
    }
    return {parsed: parsedKeys, failed: failedKeys};
  },
  /**
   * Returns a random integer between two integers.
   * @param {number} min - Minimum integer
   * @param {number} max - Maximum integer
   * @returns {number} A random integer between min and max
   */
  randomBetween: function(min, max){
    return Math.ceil(max - Math.random()*(max - (min - 1)));
  },
  /**
   * Returns a randmon string of wanted length.
   * @param {string} length - The length of the wanted string
   * @returns {string} A random string of the requested length
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
   * @returns {Object} An object without undefined values.
   */
  safeUndefined: function(obj){
    const newObj = {};
    Object.keys(obj).forEach(key => {
      newObj[key] = (obj[key] === undefined) ? null : obj[key];
    });
    return newObj;
  },
  /**
   * Check if an object is a "litteral" Object, i.e. we can safely access its properties and crawl them to see if there are nested litteral Objects
   * @param {Object} obj An object to test
   * @returns {Boolean} true if the Object is litteral, false otherwise.
   */
   isObjectLiteral: (obj) => {
    if(typeof obj !== "object" || obj === null){
      return false;
    }
    
    let ObjProto = obj;
    //get obj's Object constructor's prototype by rewinding the prototype chain (it should be the first one)
    while (Object.getPrototypeOf(ObjProto = Object.getPrototypeOf(ObjProto)) !== null);
    //check if the prototype of the object is indeed the very first prototype of the prototype chain
    return Object.getPrototypeOf(obj) === ObjProto;
  },
  /**
   * Deep clone an object. Set all the Functions of the cloned Object to undefined, as Functions can't be serialized.
   * @param {Object} source The Object to clone
   * @returns A new Object, with the source Object's values, but without any references to them.
   */
  cloneObject: function(source){
    //make a shallow clone for now
    let result = Object.assign({}, source);
    //filter the Function Objects that will throw an error when calling serialize, 
    //without mutating the original object
    const filter = (obj) => {
      Object.keys(obj).forEach((key) => {
        //check the properties
        if(typeof obj[key] === 'function'){
          obj[key] = undefined;
        }
        else if(Array.isArray(obj[key])){
          //check the array's elements
          obj[key] = obj[key].map(item => {
            if(typeof item === 'function'){
              return undefined;
            }
            //recursion on Object elements
            else if(item && this.isObjectLiteral(item)){
              //make a shallow clone of the deep objects
              item = Object.assign({}, item);
              filter(item);
              return item;
            }
            else{
              return item;
            }
          });
        }
        //recursion on Object elements
        else if(obj[key] && this.isObjectLiteral(obj[key])){
          //make a shallow clone of the deep objects
          obj[key] = Object.assign({}, obj[key]);
          filter(obj[key]);
        }
      });
    }
    filter(result);
    try{
      //clone a deep copy
      result = v8.deserialize(v8.serialize(result));
    }
    catch(e){
      result = null;
    }
    return result;
  },
  /**
   * Overwrites target's values with source's and adds source's if non existent in target.
   * @param {Object} target - The target object 
   * @param {Object} source - The source object
   * @param {boolean} noMutation - Whether or not the target and source objects should be deep cloned i.e. don't mutate them.
   * @param {boolean} isDeepClone - If true, replace the nested properties of the target by the nested properties of the source. If false, replace only the first level of properties.
   * @param {boolean} isMergingArrays - If set to true, will have any source array's elements overwrite those of the target array at the same index. If false (default) will replace source array's with target array's
   * @returns {Object} An object with properties of both objects. 
   */
  mergeObjects: function(target, source, noMutation, isDeepClone, isMergingArrays){
    //if noMutation is needed, cut all references to the provided objects
    const clonedTarget = (noMutation) ? this.cloneObject(target) : target;
    const clonedSource = (noMutation) ? this.cloneObject(source) : source;
    if(isDeepClone !== true){
      //override the target's properties with the source's ones (or create them if inexistant)
      Object.keys(clonedSource).forEach(key => clonedTarget[key] = clonedSource[key]);
      return clonedTarget;
    }
    else{
      if(!this.isObjectLiteral(clonedTarget) || !this.isObjectLiteral(clonedSource)){
        return clonedSource;
      }
      Object.keys(clonedSource).forEach(key => {
        const targetValue = clonedTarget[key];
        const sourceValue = clonedSource[key];
        
        if(Array.isArray(targetValue) && Array.isArray(sourceValue)){
          if(isMergingArrays) {
            //replace the overlapping indexes of the target's and source's array (source.length <= target.length)
            clonedTarget[key] = targetValue.map((item, index) => 
              (sourceValue.length <= index) ? item : this.mergeObjects(item, sourceValue[index], false, true, true)
            );
            //if the soruce's array is longer than the target's array, add the remaining indexes
            if(sourceValue.length > targetValue.length){
              clonedTarget[key] = clonedTarget[key].concat(sourceValue.slice(targetValue.length));
            }
          } 
          else {
            clonedTarget[key] = sourceValue;
          }
        }
        else if(this.isObjectLiteral(targetValue) && this.isObjectLiteral(sourceValue)){
          clonedTarget[key] = this.mergeObjects(targetValue, sourceValue, false, isMergingArrays);
        }
        else{
          clonedTarget[key] = sourceValue;
        }
      });
  
      return clonedTarget;
    }
  },
  /**
   * Ping the provided URL every "delay" milliseconds. Stop pinging if the URL fails more than "retries" times 
   * @param {!string} url The URL to ping
   * @param {number} [delay=60000] The delay (in milliseconds) between every ping
   * @param {number} [retries=5] The maximum failures before the ping stops 
   * @param {boolean} [rejectUnauthorized=true] Whether or not unsecure URLs must be blocked 
   * @param {function(Error, timeoutId):void} callback A callback function that is called each time a setTimeout is triggered, of if an error occured.
   */
  pingURL: (url, delay = 60000, retries = 5, rejectUnauthorized = true, callback) => {
    let currentRetries = 0;
    const ping = () => {
      got.get(url, { https:{rejectUnauthorized: rejectUnauthorized }}).then(() => {
        currentRetries = 0;
        const timeoutId = setTimeout(ping, delay);
        if(typeof callback === 'function'){
          callback(null, timeoutId);
        }
      }, (err) => {
        currentRetries++;
        if(currentRetries < retries){
          const timeoutId = setTimeout(ping, delay);
          if(typeof callback === 'function'){
            callback(err, timeoutId);
          }
        }
        else{
          if(typeof callback === 'function'){
            callback(new Error('too_many_fails'));
          }
        }
      });
    }
    const timeoutId = setTimeout(ping, delay);
    if(typeof callback === 'function'){
      callback(null, timeoutId);
    }
  }
}