/* eslint-env browser */
const WikiViewer = (function viewerModule() {
  const state = {
    query: '',
  };

  const init = () => {
    state.query = input.value;
  };

  // DOM Elements
  const form = document.querySelector('#js-search-form');
  const input = document.querySelector('#search');
  const resultsContainer = document.querySelector('#js-display-result');
  const heroImage = document.querySelector('.main-img');
  const contentContainer = document.querySelector('.content');

  // Private Methods
  const handleInput = (event) => {
    const { value } = event.target;
    state.query = value;
  };

  const populateResults = (results) => {
    results.forEach(result => (
      resultsContainer.insertAdjacentHTML(
        'afterbegin',
        `<div class='card horizontal hoverable'><div class='card-stacked'><div class='card-content'><h5 id='js-title'>${result.title}</h5><p id='js-summary'>${result.extract}</p></div><div class='card-action'><a href=${result.canonicalurl} id='js-link'>Learn More</a></div></div></div>`,
      )
    ));
  };

  const changeStyle = () => {
    resultsContainer.innerHTML = '';
    heroImage.style.display = 'none';
    contentContainer.style.marginTop = '10%';
  };

  // Public Methods
  const handleSearch = (event) => {
    event.preventDefault();

    if (state.query.length > 0) {
      changeStyle();

      const endpoint = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&inprop=url&formatversion=2&generator=search&gsrsearch=${state.query}&gsrwhat=text&prop=extracts|info&exsentences=3&exintro=''&explaintext=''&exlimit=20`;

      fetch(endpoint)
        .then(response => response.json())
        .then(json => populateResults(json.query.pages));
    }
  };

  // Public API
  return {
    init,
    form,
    input,
    handleInput,
    handleSearch,
  };
}());

WikiViewer.init();
WikiViewer.input.addEventListener('change', event => WikiViewer.handleInput(event));
WikiViewer.form.addEventListener('submit', WikiViewer.handleSearch);
