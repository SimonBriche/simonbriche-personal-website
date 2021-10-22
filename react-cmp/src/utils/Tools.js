const Tools = {
  isBootstrapAvailable: (version) => {
    if(!version) return true;
    if(!(window.bootstrap && window.bootstrap.Modal && window.bootstrap.Modal.VERSION)) return false;
    console.log('BS current version',window.bootstrap.Modal.VERSION)
    return window.bootstrap.Modal.VERSION.localeCompare(version, undefined, { numeric: true, sensitivity: 'base' }) >= 0;
  }
}

export const isBootstrapAvailable = Tools.isBootstrapAvailable;
export default Tools;