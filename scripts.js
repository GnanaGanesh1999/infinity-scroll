const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let totalPhotos = 0;
let loadedPhotos = 0;
let ready = false;

function imageLoaded() {
    loadedPhotos++;
    if(loadedPhotos === totalPhotos)
    {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes){
    for (key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    loadedPhotos = 0;
    totalPhotos = photosArray.length;
    photosArray.forEach((photo) => {
        linkToThePhoto = document.createElement("a");
        setAttributes(linkToThePhoto, {
            href: photo.links.html,
            target: "_blank"
        });

        imageElement = document.createElement("img");
        setAttributes(imageElement, {
            src: photo.urls.regular,
            alt : photo.alt_description,
            title: photo.alt_description,
        });

        imageElement.addEventListener('load', imageLoaded);
        linkToThePhoto.appendChild(imageElement);
        imageContainer.appendChild(linkToThePhoto);
    });
}

async function getPhotos() {
    try{ 
    const apiKey = "6nuBhHyJsac1zHXsQ9FcmS3Hmr-fvQA7XpJXsBHSti4"
    const photosCount = 30;
    const apiUrl = `https://api.unsplash.com//photos/random/?client_id=${apiKey}&count=${photosCount}`;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray);}
    catch(error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();    
