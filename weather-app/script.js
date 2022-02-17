const api ={
	key: "26913f12a3d51e38c81ba4d234bef45f",
	baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event){
	if(event.keyCode === 13){
		getResults(searchBox.value);
		console.log(searchBox.value);
	}
}

function getResults (query){
	fetch(`${api.baseurl}weather?q=${query}&units=metric&lang=pt_br&APPID=${api.key}`)
	.then(weather =>{
		return weather.json();
	}).then(renderResults);
}

function renderResults(weather){
	console.log(weather);
	// Pegando todos os elementos pela classe
	let city = document.querySelector('.location .city');
	let date = document.querySelector('.location .date');
	let temp = document.querySelector('.temp');
	let weatherDescription = document.querySelector('.weather');
	let hilow = document.querySelector('.hi-low');

	// Definindo dinâmicamente cada elemento
	city.innerText = `${weather.name}, ${weather.sys.country}`;
	let now = new Date();
	date.innerText = dateBuilder(now);
	temp.innerText = `${Math.round(weather.main.temp)}ºc`;
	weatherDescription.innerText = `${weather.weather[0].description}`
	hilow.innerText = `${Math.round(weather.main.temp_min)}ºc / ${Math.round(weather.main.temp_max)}ºc / ~${Math.round(weather.main.feels_like)}ºc`

	function dateBuilder(d){
		let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
		let days = ['Domingo', 'Segunda', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta', 'Sábado']	
		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day}, ${date} de ${month} de ${year}`;
	}
}