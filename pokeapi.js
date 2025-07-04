const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonResult = document.getElementById('pokemonResult');
const errorMessage = document.getElementById('errorMessage');

searchBtn.addEventListener('click', async () => {
  const name = pokemonInput.value.trim().toLowerCase();
  if (!name) return;

  // Clear previous content
  pokemonResult.innerHTML = '';
  errorMessage.textContent = '';

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error('Not found');

    const data = await response.json();

    const pokemonHTML = `
      <div class="card shadow">
        <img src="${data.sprites.front_default}" alt="${data.name}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${data.name}</h5>
          <p class="card-text">Type: ${data.types.map(t => t.type.name).join(', ')}</p>
        </div>
      </div>
    `;

    pokemonResult.innerHTML = pokemonHTML;
  } catch (err) {
    errorMessage.textContent = 'Pokémon not found. Please try a valid name.';
  }
});

// Allow Enter key to trigger the search
pokemonInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});