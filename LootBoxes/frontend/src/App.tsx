import axios from "axios";
import "./App.css";

function App() {

  async function getPokemonData(pokemon) {
    try {
      const data = await axios.get(pokemon.url);

      const speciesData = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
      const englishFlavor = speciesData.flavour_text_entries.find(entry=> entry.language.name =="en")

    }
    catch(e){
      console.error('failed to fetch')
    }
  }

  // -> request to the pokemon api -> store the date on our database -> future pokemon information request to our database
  async function getData(url: string) {
    try {
      const { data } = await axios.get(url);
      await axios.post('http://localhost:/8000/savedata',
        data
      )
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() =>
            getData("https://pokeapi.co/api/v2/pokemon?limit=151/&offset=0")
          }
        >
          Get Data
        </button>
      </div>
    </>
  );
}

export default App;
