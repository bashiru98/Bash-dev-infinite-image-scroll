const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let imageReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    imageReady = true;
    loader.hidden = true;
    initialLoad = false;
    count = 20;
  }
}
// call update after the initial load
function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// helper function

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links & photos, maniplate dom

function displayPhotos() {
  //  note set  this to always set the image count to zero on load
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");

    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create img for each picture
    const img = document.createElement("img");

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // event listener, on image finish for scrolly
    img.addEventListener("load", imageLoaded);
    // populate image in a and imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// api from the server
const apiKey = "LDMLAQ66eanvtknvyp7LaCC97g9sN5cHeO_e2nCALXQ";
let initialCount = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// fetch pictures from unsplash api
async function getPictures() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (initialLoad) {
      updateAPIURLWithNewCount(20);
      initialLoad = false;
    }
  } catch (error) {}
}

// implementing scroll event

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    imageReady
  ) {
    imageReady = false;
    getPictures();
  }
});

// on fetch data from api
getPictures();
