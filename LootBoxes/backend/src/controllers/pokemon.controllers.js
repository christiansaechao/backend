//
import prisma from "../prisma/client.js";

// data = results [{ "name": pokemon, "url": "https://pokemon-information" }];
// loop over data -> make request to the url and get that specific pokemons data
// format the data, store in new array each pokemon data
// store in our database
// process the raw data from pokemon api
// name, description, image, rarity, elementType
export const saveData = async (req, res) => {
  const { data } = req.body;

  console.log(data);
  // ["pokemonUrls"]
  const pokemonUrls = data.result.map(({ _, pokemonUrl }, index) => {
    return pokemonUrl;
  });

  // has all the indvidual pokemon information
  const allPokemonInformation = pokemonUrls.map(async (url) => {
    const pokemon = await fetch(url);
    return { cardName: pokemon.forms.url };
  });

  // format the data here

  console.log(formattedCards);
  const pokemonEntries = await prisma.card.createMany({
    data: {
      formattedCards,
    },
  });
};

export const getCards = async (req, res) => {
  try {
    const allPokemons = await prisma.user.findMany();

    res.send(allPokemons);
  } catch (error) {
    console.log("error getting pokemon data");
  }
};
