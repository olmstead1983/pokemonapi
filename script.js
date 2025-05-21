const form = document.getElementById('searchForm');
        const input = document.getElementById('pokemonInput');
        const result = document.getElementById('result');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const query = input.value.trim().toLowerCase();
            if (!query) return;
            result.innerHTML = 'Loading...';
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
                if (!res.ok) throw new Error('Pokémon not found');
                const data = await res.json();
                result.innerHTML = `
                    <div class="pokemon-info">
                        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} (#${data.id})</h2>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                        <div class="types">
                            ${data.types.map(t => `<span class="type">${t.type.name}</span>`).join('')}
                        </div>
                        <p><strong>Height:</strong> ${data.height / 10} m</p>
                        <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
                        <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
                    </div>
                `;
            } catch (err) {
                result.innerHTML = `<div class="error">Pokémon not found. Please try another name or ID.</div>`;
            }
        });
