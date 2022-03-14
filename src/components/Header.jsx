import { useEffect, useState } from "react";
import usePokemones from "../hooks/usePokemones";

const Header = () => {
  //hooks
  const [] = useState([]);
  useEffect(() => {
    setBusquedaPokemones(pokemones);
  }, []);
  const { nuevoPokemon, pokemones, setPokemonSelect, busquedaPokemones, setBusquedaPokemones } = usePokemones();

  //funciones
  const handleClick = () => {
    setPokemonSelect({});
    nuevoPokemon();
  };
  const handleChange = (e) => {
    const paramBusqueda = e.target.value;
    const pokemonesEncontrados = pokemones.filter((pokemon) =>
      pokemon.name.toUpperCase().includes(paramBusqueda.toUpperCase())
        ? pokemon
        : null
    );
    setBusquedaPokemones(pokemonesEncontrados);
  };
  return (
    <>
      <div className="header">
        <p className="listado-pokemon">Listado de pokemon</p>
        <div className="header-components">
          <input
            type="search"
            className="buscador header-search"
            placeholder="&#128269;&#65038; Buscar"
            onChange={handleChange}
          />
          <button
            className="btn header-button-search"
            onClick={(e) => handleClick(e)}
          >
            {" "}
            <span className="simbolo">&#9535;</span> Nuevo
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
