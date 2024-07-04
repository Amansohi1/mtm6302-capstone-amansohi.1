document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('pokemon-gallery');
    const loadMoreButton = document.getElementById('load-more');
    let offset = 0;
    const limit = 20;

    function loadPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(pokemon => {
                    fetch(pokemon.url)
                        .then(response => response.json())
                        .then(pokeData => {
                            const card = document.createElement('div');
                            card.className = 'col-md-3';
                            card.innerHTML = `
                                <div class="card">
                                    <img src="${pokeData.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${pokemon.name}</h5>
                                    </div>
                                </div>
                            `;
                            gallery.appendChild(card);
                        })
                        .catch(error => console.error('Error fetching Pokémon details:', error));
                });
                offset += limit;
            })
            .catch(error => console.error('Error fetching Pokémon:', error));
    }

    loadMoreButton.addEventListener('click', loadPokemon);

    loadPokemon(); // Initial load
});
