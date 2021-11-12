const got = require('got');
const crypto = require('crypto');
const config  = require('../config');
const tools = require('../utils/tools');
const arrayUtil = require('../utils/array-util');

const Marvel = {
  /**
   * Call the Marvel'API with given parameters
   * @param {string} endpoint The enpoint to be called, or the entire URL
   * @param {Object} params An object representig the parameters to send
   * @param {Object} accessToken An Object that contains the public and secret keys for this call.
   * @param {string} accessToken.public The account's public key
   * @param {string} accessToken.private The account's private key
   * @param {string} [method=GET] The method to use when calling the endpoint, defaults to GET
   * @returns {Promise} A promise that resolves with the call's result, JSON formatted
   */
  api: function (endpoint, params, accessToken, method = 'GET'){
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime();
      const hash = crypto.createHash('md5').update(timestamp+accessToken.private+accessToken.public).digest('hex');
      let url = (endpoint.substr(0,4) === 'http') ? endpoint : `${config.marvel.apiGateway}${endpoint}?ts=${timestamp}&apikey=${accessToken.public}&hash=${hash}`;
      
      const requestOptions = {
        method: method,
        url: url
      };
      
      if(params && method === 'GET'){
        requestOptions.searchParams = params;
        //set authorization info again as searchParams option will override the existing query of the url
        requestOptions.searchParams.ts = timestamp;
        requestOptions.searchParams.apikey = accessToken.public;
        requestOptions.searchParams.hash = hash;
      }
      
      if(params && method === 'POST'){
        requestOptions.form = params;
      }

      const apiCall = new URL(requestOptions.url);
      if(requestOptions.searchParams){
        apiCall.search = new URLSearchParams(requestOptions.searchParams);
      }
      apiCall.searchParams.delete('ts');
      apiCall.searchParams.delete('apikey');
      apiCall.searchParams.delete('hash');
      //don't log the access_token
      _logger.verbose('get marvel api from : ',{
        uri: decodeURIComponent(apiCall.toString()),
        method: requestOptions.method,
        form: requestOptions.form
      });
      got(requestOptions).json().then(resolve, reject);
    });
  },
  /**
   * Get a random character or comics from the Marvel's API.
   * @param {Object} accessToken An Object that contains the public and secret keys for this call.
   * @param {string} accessToken.public The account's public key
   * @param {string} accessToken.private The account's private key
   * @param {('characters'|'comics')} type The type of the item to retreive. Could be 'characters' or 'comics'.
   * @param {boolean} isFormatted Should the item be formatted (true) or contains the whole set of informations (false)
   * @returns {Object} A random character or comics from the Marvel's API.
   */
  getRandomItem: function(accessToken, type, isFormatted) {
    return new Promise(function(resolve, reject) {
      (async function() {
        //get meta infos to check the total number of items
        let typeOptions = {limit: 1};
        let imageFormat = "";
        switch(type){
          case 'characters':
            typeOptions = {limit: 1};
            imageFormat = "standard_fantastic";
          break;
          case 'comics':
            typeOptions = {limit: 1, format: "hardcover"};
            imageFormat = "portrait_incredible";
          break;
        }
        const meta = await this.api(type, typeOptions, accessToken);
        const minItems = 10;
        const totalItems = (meta && meta.data && meta.data.total > minItems) ? meta.data.total : 0;
        if(totalItems > 0){
          //get a random set of items
          typeOptions.limit = minItems;
          typeOptions.offset = tools.randomBetween(0, (totalItems - minItems));
          const items = await this.api(type, typeOptions, accessToken);

          if(items && items.data && items.data.results && items.data.results.length > 0){
            const randomItems = arrayUtil.shuffle(items.data.results);
            //try to get at least an item that have a picture AND a description
            const randomItemWithPictureAndDescription = randomItems
              .filter(item => (item.thumbnail && item.thumbnail.path && item.thumbnail.path.indexOf('image_not_available') === -1))
              .filter(item => !!item.description)[0];
            const randomItemWithPicture = randomItems
              .filter(item => (item.thumbnail && item.thumbnail.path && item.thumbnail.path.indexOf('image_not_available') === -1))[0];
            const randomItemWithDescription = randomItems
              .filter(item => !!item.description)[0];

            const randomItem = randomItemWithPictureAndDescription || randomItemWithPicture || randomItemWithDescription || randomItems[0];

            if(isFormatted){
              const thumbnailPath = (
                randomItem.thumbnail && 
                randomItem.thumbnail.path && 
                randomItem.thumbnail.extension
              ) ? randomItem.thumbnail.path.replace('http://', 'https://') : "";
              
              const thumbnail = (!thumbnailPath) ? "" : 
                                (thumbnailPath.indexOf('image_not_available') !== -1) ? thumbnailPath+'.'+randomItem.thumbnail.extension :
                                thumbnailPath+((imageFormat) ? "/"+imageFormat : "")+"."+randomItem.thumbnail.extension;
              
              const link = (randomItem.urls) ? randomItem.urls.find(item => item.type === 'detail') : "";

              const formattedItem = {
                id: randomItem.id,
                name: randomItem.name || randomItem.title,
                description: (randomItem.description) ? randomItem.description.replace(/(\r\n|\r|\n)/g, "<br>") : randomItem.description,
                thumbnail: thumbnail,
                link: (link && link.url) ? link.url.replace('http://', 'https://') : ""
              }
              resolve(formattedItem);
            }
            else{
              resolve(randomItem);
            }
          }
          else{
            reject(new Error('no_items_found'));
          }
        }
        else{
          reject(new Error('not_enough_items'));
        }
      }.bind(this))().catch(reject);
    }.bind(this));
  }
}

module.exports = Marvel;