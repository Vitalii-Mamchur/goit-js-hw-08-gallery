import galleryItems from './gallery-items.js';

const imageContainer = document.querySelector('.js-gallery');
const galleryItem = createGallery(galleryItems);

function createGallery(img) { 
    return img.map(img => {
        return `
            <li class='gallery__item'>
                <a class='gallery__link'
                href='${img.original}'>
                <img class='gallery__image'
                    src='${img.preview}'
                    data-source='${img.original}'
                    alt='${img.description}' />
                </a>
            </li>
            `;
    }).join('');
}

imageContainer.insertAdjacentHTML('afterbegin', galleryItem);

imageContainer.addEventListener('click', onImageClick);

const lightBox = document.querySelector('.lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');

function onImageClick(event) { 
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    
    lightBox.classList.add('is-open');
    lightBoxImage.src = event.target.dataset.source;
    lightBoxImage.alt = event.target.alt;
    document.addEventListener('keydown', onEscPress);
}

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

closeModalBtn.addEventListener('click', onCloseModal);
overlay.addEventListener('click', onOverlayClick);

function onCloseModal() { 
    lightBox.classList.remove('is-open');
    document.removeEventListener('keydown', onEscPress);
    lightBoxImage.src = '';
    lightBoxImage.alt = '';
}

function onOverlayClick(event) { 
    if (event.currentTarget === event.target) { 
        onCloseModal();
    }
}

function onEscPress(btn) { 
    if (btn.code === 'Escape') { 
        onCloseModal();
    }
}