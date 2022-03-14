import { useState, useEffect, createContext } from "react";

const PokemonesContext = createContext();

const PokemonesProvider = ({ children }) => {
  //hooks
  const [pokemonSelect, setPokemonSelect] = useState({});
  const [pokemones, setPokemones] = useState([]);
  const [busquedaPokemones, setBusquedaPokemones] = useState([]);
  const [mostrarFormularioPokemon, setMostrarFormularioPokemon] =
    useState(false);

  useEffect(() => {
    setBusquedaPokemones(pokemones);
  }, [pokemones]);

  useEffect(() => {
    const getPokemons = async () => {
      const respuesta = await fetch(
        `${import.meta.env.VITE_APP_URL}/?idAuthor=1`
      );
      const resultado = await respuesta.json();
      setPokemones(resultado);
      setBusquedaPokemones(resultado);
    };
    getPokemons();
  }, []);

  //funciones
  const nuevoPokemon = () => {
    setMostrarFormularioPokemon(true);
  };
  return (
    <PokemonesContext.Provider
      value={{
        mostrarFormularioPokemon,
        pokemonSelect,
        pokemones,
        busquedaPokemones,
        setPokemonSelect,
        setPokemones,
        nuevoPokemon,
        setMostrarFormularioPokemon,
        setBusquedaPokemones,
      }}
    >
      {children}
    </PokemonesContext.Provider>
  );
};

export { PokemonesProvider };
export default PokemonesContext;
