//import "lazysizes";

const Tools = {
  isBootstrapAvailable: (version) => {
    if(!version) return true;
    if(!(window.bootstrap && window.bootstrap.Modal && window.bootstrap.Modal.VERSION)) return false;
    return window.bootstrap.Modal.VERSION.localeCompare(version, undefined, { numeric: true, sensitivity: 'base' }) >= 0;
  },
  isJQueryAvailable: (version) => {
    if(!version) return true;
    if(!(window.$ && window.$.fn && window.$.fn.jquery)) return false;
    return window.$.fn.jquery.localeCompare(version, undefined, { numeric: true, sensitivity: 'base' }) >= 0;
  },
  lazyLoadImages: (el) => {
    if('loading' in HTMLImageElement.prototype) {
      const images = el.querySelectorAll("img.lazyload");
      images.forEach(img => {
        img.onload = function(){
          if(this.classList){
            //adding the 'show' class "nullify" the 'fade' class that is applied to lazyload img
            this.classList.add('show')
          }
        };
        img.src = img.dataset.src;
      });
    }
    else{
      import('lazysizes');
    }
  },
  randomString: function (length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i){
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  },
  randomBetween: function(min, max){
    return Math.ceil(max - Math.random()*(max - (min - 1)));
  }
}

export const isBootstrapAvailable = Tools.isBootstrapAvailable;
export const isJQueryAvailable = Tools.isJQueryAvailable;
export const lazyLoadImages = Tools.lazyLoadImages;
export const randomString = Tools.randomString;
export const randomBetween = Tools.randomBetween;
export default Tools;