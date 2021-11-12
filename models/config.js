const db = require('../lib/db');

module.exports = {
  /**
   * Create or update an element identified by the "key" parameter with the "value" parameter
   * @param {string} key A unique identifier
   * @param {string} value The value for this entry
   * @returns {Promise}
   */
  set: function (key, value) {
    return new Promise(function (resolve, reject) {
      db('config')
      .del()
      .where('key', key)
      .then(function () {
        db('config')
        .insert({ key: key, value: value })
        .then(resolve, reject);
      }, reject);
    });
  },
  /**
   * Returns the value of the entry identified by the "key" parameter.
   * @param {string} key The unique identifier of this entry
   * @param {boolean} isJSON Whether the value should be JSON parsed or not 
   * @returns {Promise} A promise that resolves with the value (JSON parsed or not) of the entry. Rejects with the message 'key_not_found' if no entry is found with this identifier.
   */
  get: function (key, isJSON) {
    return new Promise(function (resolve, reject) {
      db('config')
      .select('value')
      .where('key', key)
      .first()
      .then(function (result) {
        if (result) {
          if (isJSON && result.value !== "") {
            try {
              resolve(JSON.parse(result.value));
            }
            catch (e) {
              reject(e);
            }
          }
          else {
            resolve(result.value);
          }
        }
        else {
          reject(new Error('key_not_found'));
        }
      }, reject);
    });
  },
  /**
   * Get all the entries that have been created, ordered by the identifier's name.
   * @returns {Promise} A Promise that resolves with all the current entries.
   */
  getAll: function () {
    return new Promise(function (resolve, reject) {
      db('config')
      .orderBy('key')
      .then(resolve, reject);
    });
  },
  /**
   * Delete the entry identified by the "key" parameter.
   * @param {string} key The identifier of the entry to be deleted
   * @returns {Promise}
   */
  delete: function (key) {
    return new Promise(function (resolve, reject) {
      db('config')
      .del()
      .where('key', key)
      .then(resolve, reject);
    });
  }
}