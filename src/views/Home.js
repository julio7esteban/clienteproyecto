import React, { Component } from "react";

class Home extends Component{

    render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <h2>Bienvenidos </h2>
        <p>
          El siguiente proyecto se procedió a crear sobre Reactjs con Ant design
          para el tema del diseño.
        </p>

        <p>
          La Rest Api fue elaborada en Nestjs para la conexión entre la base de
          datos y el Front end.
        </p>
        <p>
          El motor de base de datos utilizado fue Mysql en el cual se crean las
          tablas y sus relaciones por la migración que se realiza desde el
          servidor Nestjs.
        </p>
        <p>Utilice el Menu derecho para poder navegar entre las opciones de peliculas y actores</p>
      </div>
    );
  }


}
export default Home;