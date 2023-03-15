const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
}

const ul = document.querySelector('.pokemons')
const prev = document.querySelector('.prev-button')
const next = document.querySelector('.next-button')

let offset = 1
let limit = 11

prev.addEventListener('click', () => {
  if(offset != 1) {
    offset -= 12;
    removeChildNodes(ul)
    fetchPokemon(limit, offset)
    window.scrollTo({top: 550, behavior: 'smooth'});
  }
})

next.addEventListener('click', () => {
  removeChildNodes(ul)
  offset += 12;
  fetchPokemon(limit, offset)
  window.scrollTo({top: 550, behavior: 'smooth'});
})

export const fetchPokemon = (limit, offset) => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i = offset; i <= limit + offset; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        
        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
            
            const types = pokemon.types.map(typeInfo => {
                const typeName = typeInfo.type.name
                const typeColor = colors[typeName]
                return `<span style="background-color: ${typeColor}">${typeName}</span>`
            }).join('')

            const firstTypeColor = colors[pokemon.types[0].type.name]

            accumulator += `<li class="card">
            <div class="fundo" style="background-color: ${firstTypeColor}">
                <div class="NameId">
                    <h1>${pokemon.name}</h1>
                    <span>#${pokemon.id}</span>
                </div>
                <img src=${pokemon['sprites']['other']['home']['front_default']} alt="pokemon">
            </div>
            <div class="infoCard">
                ${types}
            </div>
            <a href="../pages/pokemon.html?id=${pokemon.id}">Ver detalhes</a>
        </li>`
            return accumulator
        }, '') 

        ul.innerHTML = lisPokemons
    })
}

const carousel = document.querySelector('.swiper-wrapper')

for (const type in colors) {

  const slide = document.createElement('div')
  slide.classList.add('swiper-slide')

  const header = document.createElement('h2')
  header.textContent = type

  header.style.backgroundColor = colors[type]
  
  slide.appendChild(header)
  carousel.appendChild(slide)
}

const searchInput = document.querySelector('[data-pesquisa]')

searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.toLowerCase()
  const pokemonCards = document.querySelectorAll('.card')

  pokemonCards.forEach(card => {
    const pokemonName = card.querySelector('h1').textContent
    
    if (pokemonName.includes(searchTerm)) {
      card.style.display = 'flex'
    } else {
      card.style.display = 'none'
    }
  })
})

const slides = document.querySelectorAll('.swiper-slide')

slides.forEach(slide => {
  const type = slide.querySelector('h2').textContent.toLowerCase()
  
  slide.addEventListener('click', () => {
    const pokemonCards = document.querySelectorAll('.card')
    pokemonCards.forEach(card => {
      const types = Array.from(card.querySelectorAll('span')).map(span => span.textContent.toLowerCase())
      
      if (types.includes(type)) {
        card.style.display = 'flex'
      } else {
        card.style.display = 'none'
      }
    })
  })
})

function removeChildNodes(element) {
  element.style = 'none';
}

fetchPokemon(limit, offset)

