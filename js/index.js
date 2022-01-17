// apiKey: 62d85de2

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '62d85de2',
      s: searchTerm,
      // i: "tt0848228"
    }
  });
  console.log(response.data)
};


let timeoutId;
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(event.target.value)
  }, 500)

};

const input = document.querySelector('input');
input.addEventListener('input', onInput)
