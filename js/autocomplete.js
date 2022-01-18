const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {

  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown')
  const resultsWraper = root.querySelector('.results')


  const onInput = async (event) => {
    const items = await fetchData(event.target.value)

    if (!items.length) {
      dropdown.classList.remove('is-active')
      return;

    }

    resultsWraper.innerHTML = '';
    for (let item of items) {

      dropdown.classList.add('is-active')
      const option = document.createElement('a')


      option.classList.add('dropdown-item')
      option.innerHTML = renderOption(item)
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
      })

      resultsWraper.appendChild(option);
    }

  };

  input.addEventListener('input', debounce(onInput, 500))

// To close down the dropdown menu. We will listen for the click in entire document
// if this click is other than the root, we will close 'is-active' class from dropdown.

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  })


}
