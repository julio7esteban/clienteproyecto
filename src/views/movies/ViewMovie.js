import React, { Component } from "react";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Input,
  InputNumber,
  Select,
} from "antd";
import "../../assets/App.css";
import Axios from "axios";
import { BackwardOutlined } from "@ant-design/icons";

class ViewMovie extends Component {
  state = {
    pelicula: [],
    peliculas: {},
    name: "",
    gender: "",
    duration: "",
    synopsis: "",
  };

  async callApi(path, setName) {
    /**
     * Read
     */
    const r = await Axios.get(path + this.props.match.params.viewid);
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
    const _obj = object;

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

    Axios.patch("/peliculas/" + this.props.match.params.viewid, data)
      .then(() => {
        alert("Actulizado");
      })
      .catch((er) => {
        console.error(er);
        alert("Error revise la consola");
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
            <Title>Visualizar Pelicula</Title>{" "}
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
        <div style={{ padding: "40px", borderStyle:"solid" ,width:"30%", height:"100%", marginLeft:"400px" }}>
          <Row>
            <Col flex="1 1 200px">
              {this.state.pelicula.map((peli) => (
                <Title level={2}>{peli.name}</Title>
              ))}
            </Col>
          </Row>
          <Row>
            <Col flex="1 1 200px" >
              {this.state.pelicula.map((peli) => (
                <Title level={5}>{peli.duration}</Title>
              ))}
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col flex="1 1 200px" >
              {this.state.pelicula.map((peli) => (
                <Title level={5}>{peli.gender}</Title>
              ))}
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col flex="1 1 200px" >
              {this.state.pelicula.map((peli) => (
                <Title level={4}>{peli.synopsis}</Title>
              ))}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ViewMovie;
