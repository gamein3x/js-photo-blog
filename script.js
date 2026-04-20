
`use strict`

const MAIN_API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

const cardContainer = document.querySelector('#main-container');


/**
 *  @param {{ id: number, title: string, date: string, url: string}[]} posts
 */

function renderCards(posts) {
    let cardBlockHTML = '';

    for (const post of posts) {
        cardBlockHTML += `
<div class="photo-card" id="photo-card${post.id}">
                <div class="pin-container">
                    <img src="./assets_day1/img/pin.svg" alt="Pin">
                </div>
                <div class="img-container">
                    <img src="${post.url}" alt="Photo album n.${post.id}: ${post.title}">
                </div>
                <p class="photo-description mono">${post.date}<br>${post.title}</p>
            </div>
`;
    }

    if (cardContainer !== null) {
        cardContainer.innerHTML = cardBlockHTML;
    }
}

function renderModal(url, alt, desc) {
    const template = document.querySelector('#modale');
    const img = template.querySelector('img');
    const description = document.querySelector('#modal-desc');
    const Dclass = template.classList;
    Dclass.remove('d-none');
    img.src = url;
    img.alt = alt;
    description.innerHTML = desc;
};

cardContainer?.addEventListener('click', (event) => {
    const target = event.target;

    if (!target) {return null;}

    const cardEl = target.closest('.photo-card');
    const urlGrab = cardEl.querySelector('.img-container img').src;
    const altGrab = cardEl.querySelector('.img-container img').alt;
    const descGrab = cardEl.querySelector('p').innerHTML;

    if (!urlGrab) {
        return console.log('vuoto');
    } else {
        console.log(urlGrab, altGrab, descGrab);
    }
    
    renderModal(urlGrab, altGrab, descGrab);
    return urlGrab, altGrab, descGrab;
});

fetch(MAIN_API_URL)
    .then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        renderCards(json);
    }).catch(error => {
        console.error(error);
    }).finally(() => {
        console.log('Caricato');
    });