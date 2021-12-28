// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from "./music.js"
import roman from "./roman.js"
import friendlyFetch from "./friendly-fetch.js"
import { restartAnimation } from "./restart-animation.js"

const API_ENDPOINT = 'https://swapi.dev/api'

async function getFilmsOrderedByEpisodeId() {
    const films = await friendlyFetch(`${API_ENDPOINT}/films`)
    return films.results
        .sort((f1, f2) => f1.episode_id - f2.episode_id)
}

async function showFilms() {
    const ul = document.getElementById('filmes').children[0]
    ul.innerHTML = ''

    const films = await getFilmsOrderedByEpisodeId()

    films.forEach(film => {
        const li = document.createElement('li')
        li.innerHTML = `Episode ${roman[film.episode_id - 1].padEnd(3, ' ')} - ${film.title}`
        li.addEventListener('click', function (e) {
            const intro = document.querySelector('pre.introducao')
            intro.innerHTML = `Episode ${roman[film.episode_id - 1]}\n${film.title.toUpperCase()}\n\n${film.opening_crawl}`

            restartAnimation(intro)
        })
        ul.appendChild(li)
    })
}

showFilms()
play({
    audioUrl: "audio/tema-sw.mp3",
    coverImageUrl: "imgs/logo.svg",
    title: "Intro",
    artist: "John Williams"
}, document.body)
