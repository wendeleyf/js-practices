function pageLoad(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id')
  console.log(id);
 }

window.addEventListener("load", pageLoad);