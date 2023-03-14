const colors = [
    {normal: 'linear-gradient(rgba(168,168,120) 0%, rgba(122,122,71) 100%)', normalAtributoAtual: '168,168,120'},
    {fire: 'linear-gradient(rgba(240,128,48) 0%, rgba(255,72,0) 100%)', fireAtributoAtual: '240,128,48'},
    {water: 'linear-gradient(rgba(104,144,240) 0%, rgba(37,96,238,1) 100%)', waterAtributoAtual: '104,144,240'},
    {grass: 'linear-gradient(rgba(120,200,80) 0%, rgba(64,147,22,1) 100%)', grassAtributoAtual: '120,200,80'},
    {electric: 'linear-gradient(rgba(248,208,48) 0%, rgba(240,192,0,1) 100%)', electricAtributoAtual: '248,208,48'},
    {ice: 'linear-gradient(rgba(152,216,216) 0%, rgba(52,209,209,1) 100%)', iceAtributoAtual: '152,216,216'},
    {fighting: 'linear-gradient(rgba(192,48,40) 0%, rgba(115,18,13,1) 100%)', fightingAtributoAtual: '192,48,40'},
    {poison: 'linear-gradient(rgba(160,64,160) 0%, rgba(120,48,120,1) 100%)', poisonAtributoAtual: '160,64,160'},
    {ground: 'linear-gradient(rgba(224,192,104) 0%, rgba(164,125,18,1) 100%)', groundAtributoAtual: '224,192,104'},
    {flying: 'linear-gradient(rgba(168,144,240) 0%, rgba(95,68,173,1) 100%)', flyingAtributoAtual: '168,144,240'},
    {psychic: 'linear-gradient(rgba(248,88,136) 0%, rgba(215,49,99,1) 100%)', psychicAtributoAtual: '248,88,136'},
    {bug: 'linear-gradient(rgba(168,184,32) 0%, rgba(136,152,32,1) 100%)', bugAtributoAtual: '168,184,32'},
    {rock: 'linear-gradient(rgba(184,160,56) 0%, rgba(144,120,24,1) 100%)', rockAtributoAtual: '184,160,56'},
    {ghost: 'linear-gradient(rgba(112,88,152) 0%, rgba(80,64,128,1) 100%)', ghostAtributoAtual: '112,88,152'},
    {dragon: 'linear-gradient(rgba(112,56,248) 0%, rgba(72,32,216,1) 100%)', dragonAtributoAtual: '112,56,248'},
    {dark: 'linear-gradient(rgba(112,88,72) 0%, rgba(80,64,48,1) 100%)', darkAtributoAtual: '112,88,72'},
    {steel: 'linear-gradient(rgba(184,184,208) 0%, rgba(131,131,158,1) 100%)', steelAtributoAtual: '184,184,208'},
    {fairy: 'linear-gradient(rgba(238,153,172) 0%, rgba(242,92,126,1) 100%)', fairyAtributoAtual: '238,153,172'},
];

const valorMaximo = document.querySelectorAll('.valorMaximo')
const valorAtual = document.querySelectorAll('.valorAtual')
const imgPokemon = document.querySelector('.pokemonPage__pokemon img')
const nomePokemon = document.querySelector('.pokemonPage__header h2')
const idPokemon = document.querySelector('.pokemonPage__header span')
const backGround = document.querySelector('.pokemonPage')
const stats = document.querySelectorAll('stats')
const statsValor = document.querySelectorAll('.stats__valor')
  
const url = new URL(window.location.href);
const pageNumber = parseInt(url.searchParams.get('id'));
  
async function fetchPokemon() {
    const pokemonPromisse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pageNumber}`)
    const pokemons = await pokemonPromisse.json()
    return pokemons
}
  
const renderPokemon = async () => {
    const pokemons = await fetchPokemon();
    const pokemonType = pokemons.types[0].type.name;
    const color = colors.find(obj => obj[pokemonType]);
    
    valorAtual.forEach(element => {
        const attributeColor = color[`${pokemonType}AtributoAtual`];
        element.style.backgroundColor = `rgb(${attributeColor})`
    });

    valorMaximo.forEach(element => {
        const attributeColor = color[`${pokemonType}AtributoAtual`];
        element.style.backgroundColor = `rgba(${attributeColor}, 0.3)`
    })
    
    const maxStatValue = 100;

    backGround.style.background = color[pokemonType];
    nomePokemon.innerHTML = pokemons.name;
    idPokemon.innerHTML = `#${pokemons.id}`;
    imgPokemon.src = pokemons['sprites']['other']['home']['front_default'];
    const HP = pokemons.stats.find(stat => stat.stat.name === 'hp').base_stat;
    const ATK = pokemons.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const DEF = pokemons.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const SATK = pokemons.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    const SDEF = pokemons.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    const SPD = pokemons.stats.find(stat => stat.stat.name === 'speed').base_stat;

    statsValor[0].innerHTML = HP > maxStatValue ? maxStatValue : HP;
    valorAtual[0].style.width = `${HP > maxStatValue ? maxStatValue : HP}%`
    statsValor[1].innerHTML = ATK > maxStatValue ? maxStatValue : ATK;
    valorAtual[1].style.width = `${ATK > maxStatValue ? maxStatValue : ATK}%`
    statsValor[2].innerHTML = DEF > maxStatValue ? maxStatValue : DEF;
    valorAtual[2].style.width = `${DEF > maxStatValue ? maxStatValue : DEF}%`
    statsValor[3].innerHTML = SATK > maxStatValue ? maxStatValue : SATK;
    valorAtual[3].style.width = `${SATK > maxStatValue ? maxStatValue : SATK}%`
    statsValor[4].innerHTML = SDEF > maxStatValue ? maxStatValue : SDEF;
    valorAtual[4].style.width = `${SDEF > maxStatValue ? maxStatValue : SDEF}%`
    statsValor[5].innerHTML = SPD > maxStatValue ? maxStatValue : SPD;
    valorAtual[5].style.width = `${SPD > maxStatValue ? maxStatValue : SPD}%`

    statsValor.forEach((element) => {
        if (element.innerHTML === '100') {
          element.style.color = '#daa520';
          element.style.fontWeight = 'bold';
    }
})

}
  
renderPokemon();