import Pokemon from "./Pokemon";
import usePokemones from "../hooks/usePokemones";

const Pokemones = () => {
  const { pokemones, busquedaPokemones } = usePokemones();

  return (
    <>
      {busquedaPokemones.length > 0 ? (
        <div>
          <table className="table" id="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Ataque</th>
                <th>Defensa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {busquedaPokemones.map((pokemon) => (
                <Pokemon key={pokemon.id} pokemon={pokemon} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay pokemones. Inserta uno</p>
      )}
    </>
  );
};

export default Pokemones;
