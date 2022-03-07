const base_url = 'https://api.jikan.moe/v4/anime';


function pageLoad(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  getChars(id);
 }

 function getChars(id){
  fetch(`${base_url}/${id}/characters`)
  .then(response => response.json())
  .then(updateDom)
  .catch(error => console.warn(error.message))
}

function updateDom(characters){
  console.log(characters)
  const container = document.querySelector('.container');
  container.innerHTML = characters.data
  .map(character => {
    return `
      <h5>${character.character.name}</h5>
      <img src="${character.character.images.webp.image_url}" />
    `
  }).join("")
}

window.addEventListener("load", pageLoad);