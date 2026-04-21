
`use strict`

const MAIN_API_URL = 'https://lanciweb.github.io/demo/api/pictures/';



// Selettori
const cardContainer = document.querySelector('#main-container');
const template = document.querySelector('#modale');
const templateEscBtn = template.querySelector('.close-btn');
const Dclass = template.classList;
const fileLoad = document.querySelector('#loader');
const formTest = document.querySelector('#testform');

/**
 *  @param {{ id: number, title: string, date: string, url: string}[]} posts
 */

/** FUNZIONI **/

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
    const img = template.querySelector('img');
    const description = document.querySelector('#modal-desc');
    Dclass.remove('d-none');
    Dclass.add('d-flex');
    img.src = url;
    img.alt = alt;
    description.innerHTML = desc;
};

/** EVENTI **/

/* Evento click per cards */
cardContainer?.addEventListener('click', (event) => {
    const target = event.target;

    if (!target) { return null; }

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

/* Evento click chiudi bottone*/
templateEscBtn?.addEventListener('click', (event) => {
    Dclass.remove('d-flex');
    Dclass.add('d-none');
});

/* Evento changhe di input file */ //LOGICA FUNZIONA!!!
fileLoad.addEventListener('change', function () {
    const file = fileLoad.files[0];  // Primo file selezionato
    if (!file) return;

    // Estrai info base
    const fileInfo = `Nome: ${file.name}, Tipo: ${file.type}, Dimensione: ${file.size} bytes`;
    console.log(fileInfo);

    // Estrai URL
    const reader = new FileReader();
    const imgInForm = formTest.querySelector('img');
    reader.onload = function (e) {
        const dataURL = e.target.result;  // Data URL
        imgInForm.src = dataURL;
    };
    const fileURL = reader.readAsDataURL(file);  // Leggi come URL per img
    console.log(fileURL);
});

/* Fetch */
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
        console.log(':) poppe');
    });