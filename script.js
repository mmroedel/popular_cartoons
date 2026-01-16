// ----- logica da pagina "personagens de desenhos famosos"
// ----- por murilo roedel-----

const container = document.getElementById("cards-container");

function criarCard(nome, imagem, ...infos) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = imagem;

  const h2 = document.createElement("h2");
  h2.textContent = nome;

  card.appendChild(img);
  card.appendChild(h2);

  infos.forEach(texto => {
    const p = document.createElement("p");
    p.textContent = texto;
    card.appendChild(p);
  });

  container.appendChild(card);
}

// Limpa os cards antes de carregar novos
function limparTela() {
  container.innerHTML = "";
}

// rick and morty
function carregarRick() {
  limparTela();

  fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {
      data.results.slice(0, 30).forEach(personagem => {
        criarCard(
          personagem.name,
          personagem.image,
          `Status: ${personagem.status}`,
          `Espécie: ${personagem.species}`,
          `Gênero: ${personagem.gender}`,
          `Origem: ${personagem.origin.name}`,
          `Localização: ${personagem.location.name}`
        );
      });
    });
}

// pokemon
async function carregarPokemon() {
  limparTela();

  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await res.json();
    const requisicoes = data.results.map(pokemon => fetch(pokemon.url));
    const respostas = await Promise.all(requisicoes);
    const pokemons = await Promise.all(
      respostas.map(res => res.json())
    );
    pokemons.forEach(pokeData => {
      criarCard(
        pokeData.name.toUpperCase(),
        pokeData.sprites.front_default,
        `Altura: ${pokeData.height}`,
        `Peso: ${pokeData.weight} Kg`
      );
    });

  } catch (erro) {
    console.error("Erro ao carregar Pokémon:", erro);
  }
}

// Simpsons
function carregarSimpsons() {
  limparTela();

  fetch("https://apisimpsons.fly.dev/api/personajes?limit=52")
    .then(res => res.json())
    .then(data => {
      data.docs.forEach(personagem => {
        criarCard(
          personagem.Nombre,
          personagem.Imagen,
          personagem.Genero,
          personagem.Ocupacion,
          personagem.Estado,
        );
      });
    });
}