// @ts-check
`use strict`;

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const loadingMsg = document.querySelector('#loading-msg');

const postContainer = document.querySelector('#posts-container');

/**
 *  @param {{ userId: string, title: string, body: string}[]} posts
 */

function renderCards(posts) {
    let postsHtml = '';

    for (const post of posts) {
        postsHtml += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `
    }

    if (postContainer !== null) {
        postContainer.innerHTML = postsHtml;
    }
}

// il ts-check richiede questo livello di controllo per essere sicuro: 
// se l'elemento non è presente, il codice non deve avvenire.  
if (loadingMsg !== null) { 
    loadingMsg.textContent = 'Caricamento...';
    fetch(API_URL)
    .then(response => {
        loadingMsg.textContent = 'Caricando promesse...';
        return response.json();
    }).then(json => {
        console.log(json);
        renderCards(json);
    }).catch(error => {
        console.error(error);
        loadingMsg.textContent = 'Errore. Prova a ricaricare.';
    }).finally(() => {
        loadingMsg.textContent = 'Caricato :)';
    });
};


