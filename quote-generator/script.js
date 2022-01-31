// Elementos HTML
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Mostrar nova frase
function newQuote(){
	
	// Pegar uma frase aleatória do apiQuotes
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

	// Verificar se o campo author está vazio e substituir por 'Desconhecido' se verdadeiro
	if(!quote.author){
		authorText.textContent = 'Desconhecido';
	}else{
		authorText.textContent = quote.author;
	}
	quoteText.textContent = quote.text;

	// Verificar o tamanho da frase para determinar seu estilo;
	if(quote.text.length > 120){
		quoteText.classList.add('long-quote');
	}else{
		quoteText.classList.remove('long-quote');
	}
}

// Pegar quotes da API
async function getQuotes(){
	const apiURL = 'https://type.fit/api/quotes';
	try{
		const response = await fetch(apiURL);
		apiQuotes = await response.json();
		newQuote();
	}catch(error){
		// Catch Errors
	}
}

//  Event Listeners
newQuoteBtn.addEventListener('click', newQuote);

// Init
getQuotes();