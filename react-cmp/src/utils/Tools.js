//import "lazysizes";

const Tools = {
  isBootstrapAvailable: (version) => {
    if(!version) return true;
    if(!(window.bootstrap && window.bootstrap.Modal && window.bootstrap.Modal.VERSION)) return false;
    return window.bootstrap.Modal.VERSION.localeCompare(version, undefined, { numeric: true, sensitivity: 'base' }) >= 0;
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
  }
}

export const isBootstrapAvailable = Tools.isBootstrapAvailable;
export const lazyLoadImages = Tools.lazyLoadImages;
export default Tools;