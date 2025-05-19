import React from "react";

type Props = {
  name?: string;
};

const Greeting: React.FC<Props> = ({ name = "Desconocido" }) => {
  return <h3>Hola {name}!</h3>;
};

export default Greeting;
