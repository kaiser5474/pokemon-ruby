import React from "react";

const Mensaje = ({ mensaje }) => {
  const { msg, error } = mensaje;
  return <p className={`mensaje ${error ? "error" : "informacion"}`}>{msg}</p>;
};

export default Mensaje;
