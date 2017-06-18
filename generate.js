const fs = require("fs");
const path = require("path");

const images = require('./js/images');

images.forEach((image, index) =>
{
  let menu = '';
  
  images.forEach((link, lIndex) =>
  {
    if (link.link != 'index')
    {
      menu += `
      <a href="${link.link}.html" onclick="javascript:showImage(${lIndex})"><img src="thumb/${link.image}" /></a>
      `
    }
  });
  
  let preview = '';
  if (image.link === 'index')
  {
    preview = `<strong id="preview-text-title">${image.title}...</strong>`;
  }
  else
  {
    preview = `<strong id="preview-text-title">${image.title}</strong>, it's in our nature...`;
  }
  
  
  let date = new Date();
  
  fs.writeFileSync(path.join('docs', image.link + '.html'), `<!doctype html>
<html>
<head>
<title>${image.title} | Planet ARK</title>
<meta charset="UTF-8">
<meta name="description" content="${image.location}">
<meta name="keywords" content="Planet Arc National Tree Day">
<meta name="author" content="Nahid Akbar">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:title" content="${image.title}" />
<meta property="og:type" content="place" />
<meta property="og:image" content="thumb/${image.image}" /> 
<meta property="og:description" content="${image.text}" /> 
<meta property="og:site_name" content="Planet Arc" /> 
<link rel="stylesheet" href="index.css" lazyload />
<script>
window.currentImage = ${index};
</script>
<script src="index.js"></script>
</head>
<body>
<div id="header" class="outer">
  <div id="header-inner" class="inner">
  <a href="http://treeday.planetark.org/" target="_blank">
  <img src="log.png" />
  </a>
  </div>
</div>
<div id="current" class="outer">
  <div id="navigate-left" class="outer-sidebar"><a id="next-link" href="#" onclick="javascript:prevImage()" title="previous image"><img src="pre.svg" /></a></div>
  <div id="current-inner" class="inner">
    <div id="preview">
      <img id="preview-image" src="image/${image.image}" />
      <p id="preview-location">${image.location}</p>
    </div>
  </div>
  <div id="navigate-right" class="outer-sidebar"><a id="prev-link" href="#" onclick="javascript:nextImage()" title="next image"><img src="nex.svg" /></a></div>
  <div id="navigate-right-bottom">
    <a id="prev-link" href="#" onclick="javascript:soundOn()" title="turn on sound"><img src="son.svg" /></a>
    <a id="prev-link" href="#" onclick="javascript:soundOff()" title="turn off sound"><img src="sof.svg" /></a>
  </div>
</div>
<div id="text" class="outer">
  <div class="sub-inner">
    <div id="preview-text-header">${preview}</div>
    <div id="preview-text-body">${image.text}</div>
    <hr />
    <div id="preview-social-media">
      <a onclick="javascript:shareFacebook()" title="Share on facebook"><img src="fac.png" /></a>
      <a onclick="javascript:shareTwitter()"  title="Share on twitter"><img src="twi.png" /></a>
      <a onclick="javascript:shareInstagram()" title="Visit planet ark's instagram page"><img src="ins.png" /></a>
      <a onclick="javascript:shareEmail()"><img src="mai.png" /></a>
    </div>
  </div>
</div>
<div id="options-inner" class="inner">
  ${menu}
</div>
<div id="footer" class="outer">
  <div id="footer-inner" class="inner">
    <ul>
        <li class="first">Tree Day Hotline: <a href=tel:1300885000>1300 88 5000</a></li>
        <li>Copyright &copy; 2017, <a href="http://www.planetark.com/">Planet Ark</a></li>
        <li>Courtesy Of <a href="mailto:steveparish@natureconnect.com.au">Steve Parish</a></li>
        <li>Page updated: ${new Date().toDateString().substr(4).replace(/ /g, '-')}</li>
        <li><span class="noprint"><a href="//treeday.planetark.org/contact.cfm">Contact Us</a></span></li>
        <li><span class="noprint"><a href="//treeday.planetark.org/privacy.cfm">Privacy Policy</a></span></li>
        <li><span class="noprint"><a href="//treeday.planetark.org/sitemap.cfm">Site map</a></span></li>
    </ul>
  </div>
</div>
<audio id="music" autoplay loop>
  <source src="music.mp3" type="audio/mpeg">
  <source src="music.ogg" type="audio/ogg">
  <source src="music.wav" type="audio/wav">
  Your browser does not support the audio element.
</audio>
</body>
</html>  
  `);
});
