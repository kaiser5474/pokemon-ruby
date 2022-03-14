import { useState, useEffect } from "react";
import usePokemones from "../hooks/usePokemones";
import Mensaje from "./Mensaje";

const FormularioPokemon = () => {
  //hooks
  const [name, setName] = useState("");
  const [attack, setAttack] = useState("50");
  const [image, setImage] = useState("");
  const [defense, setDefense] = useState("50");
  const [mensaje, setMensaje] = useState({});
  const [disabledButton, setDisabledButton] = useState("disabled");
  const [disabledButtonCancelar, setDisabledButtonCancelar] = useState("");
  const {
    mostrarFormularioPokemon,
    setPokemones,
    pokemones,
    setMostrarFormularioPokemon,
    pokemonSelect,
  } = usePokemones();

  useEffect(() => {
    if ([name, attack, image, defense].includes("")) {
      setDisabledButton("disabled");
    } else {
      setDisabledButton("");
    }
  }, [name, image]);

  useEffect(() => {
    if (pokemonSelect.id) {
      setDisabledButton("");
      setName(pokemonSelect.name);
      setAttack(pokemonSelect.attack);
      setImage(pokemonSelect.image);
      setDefense(pokemonSelect.defense);
    } else {
      setDisabledButton("disabled");
      limpiarCampos();
    }
  }, [pokemonSelect]);

  //funciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, attack, image, defense].includes("")) {
      setMensaje({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setError({});
      }, 3000);
      return;
    }
    if (pokemonSelect.id) {
      //estoy editando
      const respuesta = await fetch(
        `${import.meta.env.VITE_APP_URL}/${pokemonSelect.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: name,
            image: image,
            type: "water",
            hp: "0",
            attack: attack,
            defense: defense,
            idAuthor: 1,
          }),
        }
      );
      const resultado = await respuesta.json();
      const pokemonesActualizados = pokemones.map((pokemon) =>
        pokemon.id === pokemonSelect.id ? resultado : pokemon
      );
      setDisabledButton("disabled");
      setDisabledButtonCancelar("disabled");
      setPokemones(pokemonesActualizados);
      setMensaje({
        msg: "Pokemon actualizado correctamente",
        error: false,
      });
      setTimeout(() => {
        setMensaje({});
        limpiarCampos();
        setMostrarFormularioPokemon(false);
      }, 3000);
    } else {
      //estoy insertando
      const respuesta = await fetch(
        `${import.meta.env.VITE_APP_URL}/?idAuthor=1`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            image,
            type: "water",
            hp: "0",
            attack,
            defense,
            idAuthor: 1,
          }),
        }
      );
      const resultado = await respuesta.json();
      setDisabledButton("disabled");
      setDisabledButtonCancelar("disabled");
      setPokemones([...pokemones, resultado]);
      setMensaje({
        msg: "Pokemon insertado correctamente",
        error: false,
      });
      setTimeout(() => {
        setMensaje({});
        limpiarCampos();
        setMostrarFormularioPokemon(false);
      }, 3000);
    }
  };

  const cancelar = () => {
    limpiarCampos();
    setMostrarFormularioPokemon(false);
  };

  const limpiarCampos = () => {
    setName("");
    setAttack("50");
    setImage("");
    setDefense("50");
    setDisabledButtonCancelar("");
  };
  return (
    <>
      {mostrarFormularioPokemon && (
        <div className="form-group">
          <p>{pokemonSelect.id ? "Editar Pokemon" : "Nuevo Pokemon"}</p>
          {mensaje.msg && <Mensaje mensaje={mensaje} />}
          <form onSubmit={handleSubmit}>
            <div className="div-group-input">
              <div>
                <label htmlFor="nombre">Nombre: </label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre pokemon"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ataque">Ataque: </label>
                0
                <input
                  type="range"
                  id="ataque"
                  min="0"
                  max="100"
                  placeholder="Nombre pokemon"
                  value={attack}
                  onChange={(e) => setAttack(e.target.value)}
                />
                100
              </div>
            </div>
            <div className="div-group-input">
              <div>
                <label htmlFor="imagen">Imagen: </label>
                <input
                  type="text"
                  id="imagen"
                  placeholder="url"
                  className="form-input"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="defensa" className="label">
                  Defensa:{" "}
                </label>
                0
                <input
                  type="range"
                  id="defensa"
                  min="0"
                  max="100"
                  className="form-range"
                  value={defense}
                  onChange={(e) => setDefense(e.target.value)}
                />
                100
              </div>
            </div>
            <div className="div-group-btn">
              <button
                type="submit"
                className="btn btn-guardar"
                disabled={disabledButton}
              >
                <span className="simbolo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-life-preserver"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm6.43-5.228a7.025 7.025 0 0 1-3.658 3.658l-1.115-2.788a4.015 4.015 0 0 0 1.985-1.985l2.788 1.115zM5.228 14.43a7.025 7.025 0 0 1-3.658-3.658l2.788-1.115a4.015 4.015 0 0 0 1.985 1.985L5.228 14.43zm9.202-9.202-2.788 1.115a4.015 4.015 0 0 0-1.985-1.985l1.115-2.788a7.025 7.025 0 0 1 3.658 3.658zm-8.087-.87a4.015 4.015 0 0 0-1.985 1.985L1.57 5.228A7.025 7.025 0 0 1 5.228 1.57l1.115 2.788zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </span>
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-cancelar"
                onClick={cancelar}
                disabled={disabledButtonCancelar}
              >
                <span className="simbolo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                    />
                  </svg>
                </span>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FormularioPokemon;
