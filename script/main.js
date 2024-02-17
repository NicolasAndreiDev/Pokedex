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
};

const types = [
    { name: 'normal', num: 1 },
    { name: 'fighting', num: 2 },
    { name: 'flying', num: 3 },
    { name: 'poison', num: 4 },
    { name: 'ground', num: 5 },
    { name: 'rock', num: 6 },
    { name: 'bug', num: 7 },
    { name: 'ghost', num: 8 },
    { name: 'steel', num: 9 },
    { name: 'fire', num: 10 },
    { name: 'water', num: 11 },
    { name: 'grass', num: 12 },
    { name: 'electric', num: 13 },
    { name: 'psychic', num: 14 },
    { name: 'ice', num: 15 },
    { name: 'dragon', num: 16 },
    { name: 'dark', num: 17 },
    { name: 'fairy', num: 18 },
];

const ul = document.querySelector('.pokemons');
const prev = document.querySelector('.prev-button');
const next = document.querySelector('.next-button');

let offset = 1, limit = 11, typeNumber = null;

prev.addEventListener('click', async () => {
  if(offset != 1) {
    offset -= 12;
    removeChildNodes(ul)
    fetchPokemon(limit, offset, typeNumber)
    window.scrollTo({top: 550, behavior: 'smooth'});
  }
});

next.addEventListener('click', async () => {
  let pokemons = await fetchPokemon(limit, offset, typeNumber);
  
  if(pokemons && pokemons.length != 0) {
    offset += 12;
    removeChildNodes(ul);
    await fetchPokemon(limit, offset, typeNumber);
    pokemons = await fetchPokemon(limit, offset, typeNumber);
    window.scrollTo({top: 550, behavior: 'smooth'});
    if(pokemons.length == 0) {
      offset -= 12;
      removeChildNodes(ul);
      fetchPokemon(limit, offset, typeNumber);
    } 
  }
});


export const fetchPokemon = async (limit, offset, type = null) => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
  
  const pokemonPromises = [];

  if (type !== null) {
    await fetch(`https://pokeapi.co/api/v2/type/${type}`).then(response => response.json()).then(data => {
      data.pokemon.slice(offset, limit + offset + 1).forEach(pokemon => {
        pokemonPromises.push(fetch(pokemon.pokemon.url).then(response => response.json()));
      });
    });
  } else {
    for (let i = offset; i <= limit + offset; i++) {
      pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }
  }
  
  Promise.all(pokemonPromises)
  .then(pokemons => {
    
    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => {
        const typeName = typeInfo.type.name;
        const typeColor = colors[typeName];
        return `<span style="background-color: ${typeColor}">${typeName}</span>`
      }).join('');
      
      const firstTypeColor = colors[pokemon.types[0].type.name];
      
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
  
    ul.innerHTML = lisPokemons;
  })

  return pokemonPromises;
}

const carousel = document.querySelector('.swiper-wrapper');

for (const type in colors) {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  
  const header = document.createElement('h2');
  header.textContent = type;
  
  header.style.backgroundColor = colors[type];
  
  slide.appendChild(header);
  carousel.appendChild(slide);
}

const searchInput = document.querySelector('[data-pesquisa]');

searchInput.addEventListener('keyup', async () => {
  typeNumber = null;
  const searchTerm = await searchInput.value.toLowerCase();
  const pokemonCards = document.querySelectorAll('.card');
  const pokemonByName = async () => {
    await fetchPokemon(limit, offset, typeNumber);
  }
  
  if(searchTerm != "" && limit != 1000) {
    limit = 1000;
    await pokemonByName();
  } 

  if(searchTerm == "") {
    limit = 11;
    await pokemonByName();
  }
  
  pokemonCards.forEach(card => {
    const pokemonName = card.querySelector('h1').textContent;
    
    if (pokemonName.startsWith(searchTerm)) card.style.display = 'flex';
    else card.style.display = 'none';
  });
})

const slides = document.querySelectorAll('.swiper-slide');

slides.forEach(slide => {
  const type = slide.querySelector('h2').textContent.toLowerCase();
  
  slide.addEventListener('click', () => {
    typeNumber = types.find((AllTypes) => AllTypes.name === type).num;
    limit = 11, offset = 1;
    fetchPokemon(limit, offset, typeNumber);
    const pokemonCards = document.querySelectorAll('.card');
    pokemonCards.forEach(card => {
      const types = Array.from(card.querySelectorAll('span')).map(span => span.textContent.toLowerCase());
      
      if (types.includes(type)) card.style.display = 'flex';
      else card.style.display = 'none';
    })
  })
})

const clearType = document.querySelector(".button-clear-type");
clearType.addEventListener("click", () => {
  if(typeNumber != null) {
    limit = 11, offset = 1, typeNumber = null;
    fetchPokemon(limit, offset, typeNumber);
  }
})

function removeChildNodes(element) {
  element.style = 'none';
}

fetchPokemon(limit, offset, typeNumber);
