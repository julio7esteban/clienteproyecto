import React, { Component, useEffect } from "react";
import {
  Row,
  Col,
  Modal,
  Divider,
  Typography,
  Button,
  Table,
  Tag,
  Space,
  Input,
  InputNumber,
  Select,
} from "antd";
import "../../assets/App.css";
import Axios from "axios";
import { FileAddOutlined, BackwardOutlined } from "@ant-design/icons";

class Form extends Component {
  state = {
    pelicula: [],

   
  };

  async callApi(path, setName) {
    /**
     * Read
     */
    const r = await Axios.get(path + this.props.match.params.peliid);
    this.setState({ [setName]: r.data });
  }
  async callactors(path, setName) {
    /**
     * Read
     */
    const r = await Axios.get(path);
    this.setState({ [setName]: r.data });
  }
  componentDidMount() {
    this.callactors("/actores", "actors");
    this.callApi("/peliculas/", "pelicula");
  }
  setValue(name, isTarget) {
    return (v) => {
      const _value = isTarget ? v.target.value : v;
      console.log(name, _value);

      this.setState({ [name]: _value });
    };
  }
  pickProps(props, object) {
     const _obj = {};
     for (const key in object) {
       if (props.indexOf(key) > -1) {
         _obj[key] = object[key];
       }
     }
     return _obj;
  }

  handleChange(v) {
    //console.log(v);
  }
  //envio de datos
  sendData(v) {
    const data = {
      ...this.pickProps(["name"], v),
      ...this.pickProps(["gender"], v),
      ...this.pickProps(["duration"], v),
      ...this.pickProps(["synopsis"], v),
    };
    delete data.selectActors;
    /***
     * Create
     */

    Axios.patch("/peliculas/"+this.props.match.params.peliid, data)
      .then(() => {
        alert("Actulizado");
        this.handleClick();
      })
      .catch((er) => {
        console.error(er);
        alert("Error al actualizar o no se a Cambiado nada");
      });
    // location.href ='/ruta'
    //{this.state.peliculas.map((v)=>`${JSON.stringify(v)}`)}
    //modal Funciones
  }
  handleClick = () => {
    this.props.history.push("/movies");
  };
  //this.state.pelicula.map((peli) => peli.name);

  render() {
    const { Title } = Typography;
    const { Option } = Select;

    return (
      <div style={{ padding: "40px" }}>
        <Row>
          <Col flex="1 1 300px" style={{ display: "flex" }}>
            <Title>Actulizar pelicula</Title>{" "}
          </Col>
          <Col flex="0 1 100px">
            <Button
              type="primary"
              style={{ width: "200px" }}
              className="buttoncreate"
              shape="round"
              onClick={this.handleClick}
              icon={<BackwardOutlined />}
            >
              Atras
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col flex="1 1 200px">
            {this.state.pelicula.map((peli) => (
              <Input
                style={{ width: "50%" }}
                defaultValue={peli.name}
                value={this.state.pelicula.name}
                placeholder="Nombre"
                onChange={this.setValue("name", true)}
              ></Input>
            ))}
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col flex="1 1 200px">
            {this.state.pelicula.map((peli) => (
              <InputNumber
                style={{ width: "50%" }}
                defaultValue={peli.duration}
                placeholder="Duracion(Minutos)"
                onChange={this.setValue("duration")}
              ></InputNumber>
            ))}
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col flex="1 1 200px">
            {this.state.pelicula.map((peli) => (
              <Input
                style={{ width: "50%" }}
                defaultValue={peli.gender}
                value={this.state.pelicula.gender}
                placeholder="Genero"
                onChange={this.setValue("gender", true)}
              ></Input>
            ))}
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col flex="1 1 200px">
            {this.state.pelicula.map((peli) => (
              <Input
                style={{ width: "50%" }}
                defaultValue={peli.synopsis}
                value={this.state.pelicula.synopsis}
                placeholder="Sinopsis"
                onChange={this.setValue("synopsis", true)}
              ></Input>
            ))}
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col flex="1 1 200px">
            <Button
              className="buttoncreate"
              type="primary"
              style={{ width: "50%" }}
              onClick={() => this.sendData(this.state)}
            >
              {"Actualizar"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form;
