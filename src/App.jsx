import { useState } from "react";
import "./App.css";
import FormularioPokemon from "./components/FormularioPokemon";
import Header from "./components/Header";
import Pokemones from "./components/Pokemones";
import { PokemonesProvider } from "./context/PokemonesProvider";

function App() {
  const [pokemones, setPokemones] = useState([]);
  return (
    <PokemonesProvider>
      <div className="app">
        <Header />
        <Pokemones pokemones={pokemones} setPokemones={setPokemones} />
        <FormularioPokemon pokemones={pokemones} setPokemones={setPokemones} />
      </div>
    </PokemonesProvider>
  );
}

export default App;
