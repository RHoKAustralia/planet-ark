"use strict"

// images data
const images = require('./images');

// go to next image
window.nextImage = function()
{
  showImage((currentImage + 1) % images.length);
};

// go to previous image
window.prevImage = function()
{
  showImage((currentImage + images.length - 1) % images.length);
};

// show an arbitary image
window.showImage = function(image)
{
  image = show(image);
  event.preventDefault();
  history.pushState({}, document.title, `${image.link}.html`);
};

// implementation for showing an arbitrary image
function show(image)
{
  currentImage = image;
  image = images[currentImage];
  
  const imageContainer = document.getElementById('preview-image');
  
  const oldSrc = imageContainer.src;
  
  // maybe remove this when you implement slider
  document.getElementById('preview-image').src = `data:image/gif;base64,R0lGODlhQAHwAKIAAP///8zMzJmZmWZmZjMzMwAAAAAAAAAAACH5BAAAAAAALAAAAABAAfAAAAP/CLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBN6EzCgoQAhARo2XBBRIj8CBTISEDIg/2NGih4LXPS4MUhHjyBR7sOokWPIlB9XknSpEkDFiTJbmnw5kGWBkhYi+iQwIAAEoSGJGn0wgCVRACdj2iRAFSiAqiWbahwQQetPrgGqcrU29ELUkBnHMhCAFu1SmGjPwmUQMkDbn28V2L3LVme1shXO3lVr865buIal7pUKIHFSBosdW50GeEJfkl49PlRwVqLPApuhoiX6WTFPBW2JCn4rmPToa5UlfA4dWaQCn2ojq0369rLpmo1Dhj4bmveCs5OlxT4akjAA36Ft5r3qcSz0Bp/nLmjegPtz4dhnkhUv4ez04GkdBGBYeqzcBu8LA/e+vTrn08fJU1vOFP+C2P+ZteWef6LVFBldmnVnX4GM3efXfvpBEFVy1PlVmoAONsigbfIxVpeC6W3owISwRdgfcP8t+NkAAhiFW4Yc5mcgfh8iGGJ8Mv5U4oMQXAcZeLox8OJ3Hk2XnV40FgliAdaBJ6SJ0fCn3mNPKunbW0F2yORaaGmHmpI2bqklAaxRqVcAaEKGZl5rptnLZ1jFScBmyLUowIoK+DZWWPStiOaFXqJXwHT0tRagjkjOB2aFiPJyoWF7OjbjaBgmKimHB9aXEaELapkYUJl+uWmKPOby6GCItZWXYCTh51tzp4UqKKch5nkXUeTJWiOjFN5yaqU50scAqy06aStvoeq6qKjIYlLUGYOgJjnqbVA6c1N06jHUogXanhcDiQrZoNFTVTYb7gxxGRWRsefKwGpq7YorqbfxvvAuk/TWC8N6Ermp778AByzwwAQXbPDBCCes8MIMN+zwwxBHLPHEFFds8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300kw37fTTUEct9dRUV2311VhnrfXWXHft9ddghy322GSXbfbZaKcNRQIAOw==`;
  
  if (image.link === 'index')
  {
    document.getElementById('preview-text-header').innerHTML = `<strong id="preview-text-title">${image.title}...</strong>`;
  }
  else
  {
    document.getElementById('preview-text-header').innerHTML = `<strong id="preview-text-title">${image.title}</strong>, it's in our nature...`;
  }
  
  document.getElementById('preview-text-body').innerHTML = image.text;
  document.getElementById('preview-location').innerHTML = image.location;
  
  setTimeout(function()
  {
    imageContainer.src = `image/${image.image}`;
  }, 10);
  
  if (document.body.scrollTop > imageContainer.offsetTop + imageContainer.clientHeight * .5)
  {
    imageContainer.scrollIntoView();
  }
  
  const oldImageScrollOut = document.createElement('img');
  oldImageScrollOut.style.position = 'absolute';
  oldImageScrollOut.style.top = imageContainer.offsetTop + 'px';
  oldImageScrollOut.style.left = imageContainer.offsetLeft + 'px';
  oldImageScrollOut.style.width = imageContainer.clientWidth + 'px';
  oldImageScrollOut.style.height = imageContainer.clientHeight + 'px';
  oldImageScrollOut.style.zIndex = 200;
  oldImageScrollOut.src = oldSrc;
  document.body.appendChild(oldImageScrollOut);
  
  animate(oldImageScrollOut, 'opacity', 1.0, -0.01, 0);
  
  return image;
}

function animate(element, property, start, increment, until)
{
  element.style[property] = start + '';
  if (start > until)
  {
    setTimeout(function()
    {
      animate(element, property, start + increment, increment, until);
    }, 10);
  }
  else
  {
    element.parentNode.removeChild(element);
  }
}

// 
window.onpopstate = function(event)
{
  let page = window.location.pathname;
  page = page.substr(page.lastIndexOf('/'));
  let found = 0;
  images.forEach((image, index) =>
  {
    if (page.indexOf(image.link) === 1)
    {
      found = index;
    }
  })
  show(found);
}

window.shareFacebook = function()
{
  link(`//www.facebook.com/sharer.php?u=${window.location}`);
};

window.shareTwitter = function()
{
  link(`//twitter.com/share?url=${window.location}`);
};

window.shareInstagram = function()
{
  link(`https://www.instagram.com/ourplanetark/?hl=en`);
};

window.shareEmail = function()
{
  const image = images[currentImage];
  gotoLink(`mailto:?subject=${image.title}&body=${window.location}`);
};

function link(url)
{
  let win = window.open(url, "_blank", "height=400,width=600");
  if (!win)
  {
    gotoLink(url);
  }
}

function gotoLink(url)
{
  let a = document.createElement('a');
  a.setAttributeNode(attribute('href', url));
  a.setAttributeNode(attribute('target', `_blank`));
  a.click()
}

function attribute(name, value)
{
  const attr = document.createAttribute(name)
  attr.value = value;
  return attr;
}

// turn sound on
window.soundOn = function()
{
  document.getElementById('music').muted = false;
  event.preventDefault();
};

// turn sound off
window.soundOff = function()
{
  document.getElementById('music').muted = true;
  event.preventDefault();
};

// lazy pre-load other images
window.onload = function()
{
  for (const image of images)
  {
    let container = document.createElement('img');
    document.body.appendChild(container);
    container.style.display = 'none';
    container.src = `image/${image.image}`;
  }
};
