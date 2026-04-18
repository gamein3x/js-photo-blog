// @ts-check
`use strict`

const MAIN_API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

/**
 *  @param {{ id: number, title: string, date: string, url: string}[]} posts
 */

fetch(MAIN_API_URL)
    .then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(error => {
        console.error(error);
    }).finally(() => {
        console.log('Caricato');
    });