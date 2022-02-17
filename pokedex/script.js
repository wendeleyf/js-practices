const container = document.getElementById('container');
const pokemon_count = 151;
const types = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
}

const main_types = Object.keys(types)

const fetchPokemon = async () => {
	for(let i = 1; i <= pokemon_count; i++){
		await getPokemon(i);
	}
}

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
	const pokemonElement = document.createElement('div');
	pokemonElement.classList.add('pokemon');
	const id = ('00'+ (pokemon.id)).slice(-3);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

	const pokemon_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => pokemon_types.indexOf(type) > -1)
	const color = types[type];

	pokemonElement.style.backgroundColor = color;

	const pokemonInnerHTML = `
		<div class="image-container">
			<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="">
		</div>
		<div class="info">
			<span class="pokedex-id">${id}</span>
			<h3 name="name">${name}</h3>
			<small class="type">Type: <span>${type}</span></small>
		</div>
	`
	pokemonElement.innerHTML = pokemonInnerHTML;
	container.appendChild(pokemonElement);
}

fetchPokemon();