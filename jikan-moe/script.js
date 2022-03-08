const base_url = 'https://api.jikan.moe/v4/anime';

function searchAnime(){
  //Prevenindo o comportamento padrão do elemento
  event.preventDefault();

  //Pegando o form da página html
  const form = new FormData(this);
  const query = form.get("search");

  fetch(`${base_url}?q=${query}&sfw=true`)
  .then(response => response.json())
  .then(updateDom)
  .catch(error=>console.warn(error.message));
}

function updateDom(results){

  const searchResults = document.querySelector('#anime-container');
  console.log(results.data)
  searchResults.innerHTML = results.data
  .sort((a,b) => b.episodes-a.episodes)
  .map(anime=>{
    if(anime.synopsis && anime.synopsis.length > 300){
      anime.synopsis = `${anime.synopsis.substring(0,350)}...`;
    }
    return `
    <div class="col">
      <div class="anime-card card h-100">
          <img src="${anime.images.webp.large_image_url}" class="card-img-top">
      <div class="card-body d-flex flex-column">
          <h5 class="card-title">${anime.title}</h5>
          <p>${anime.synopsis}</p>
          <div class="container p-0 m-0"
            <div class="row">
              <a href="./info/detalhes.html?id=${anime.mal_id}" class="btn anime-btn-detail" target="_blank">Detalhes</a>
              <a href="${anime.url}" class="btn anime-btn-mal" target="_blank">MAL</a>
            </div>
          </div>
      </div>
      </div>
      </div>
    `
  }).join("");
}

function pageLoad(){
 const form = document.getElementById('search-form');
 form.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageLoad);