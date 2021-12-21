(async () => {
  const head = document.getElementsByTagName('head')[0];

  //get the path of the index.html, that should be adjacent to this script
  const indexPath = document.currentScript.src.replace('cmp-loader.js', 'index.html');
  //get the index content
  const indexHTML = await (await fetch(indexPath)).text();
  
  //assume that all the .js and .css files to load are in the "static" folder
  const reactCSSRegexp = new RegExp('<link href="(.*?)\/static\/css\/(.*?)\.css" rel="stylesheet">', 'gm');
  const reactJSRegexp = new RegExp('<script (.*?)\/static\/js\/(.*?)\.js"><\/script>', 'gm');

  //grab all the css tags
  const ReactCSS = [].concat(indexHTML.match(reactCSSRegexp)).join('');
  //grab all the js tags
  const ReactJS = [].concat(indexHTML.match(reactJSRegexp)).join('');

  //parse and execute the scripts
  const scriptsDoc = new DOMParser().parseFromString(ReactJS, 'text/html');
  Array.from(scriptsDoc.getElementsByTagName('script')).forEach(item => {
    const script = document.createElement('script');
    [...item.attributes].forEach(attr => {
      script.setAttribute(attr.name, attr.value)
    })
    head.appendChild(script);
  });
  //inject the CSS
  head.insertAdjacentHTML('beforeend', ReactCSS);
})().catch(e => {
  console.log('fail to load react-cmp', e)
});