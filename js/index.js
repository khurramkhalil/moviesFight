// apiKey: 62d85de2

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '62d85de2', s: searchTerm, // i: "tt0848228"
    }
  });

  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Search For a Movie</b></label>label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown')
const resultsWraper = document.querySelector('.results')


const onInput = async (event) => {
  const movies = await fetchData(event.target.value)
  resultsWraper.innerHTML = '';
  for (let movie of movies) {

    dropdown.classList.add('is-active')
    const option = document.createElement('a')

    const imgSrc = movie.Poster === 'N/A'? '' : movie.Poster
    option.classList.add('dropdown-item')
    option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;

    resultsWraper.appendChild(option);
  }

};


input.addEventListener('input', debounce(onInput, 500))
