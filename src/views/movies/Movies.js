import React, { Component } from "react";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Table,
  Modal,
  Space,
  Input,
  Select,
  InputNumber,
} from "antd";
import butoncreate from "../../assets/App.css";
import Axios from "axios";
import { withRouter,Link } from "react-router-dom";

import { FileAddOutlined, BackwardOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";
let uniqueId = 0;

class Movies extends Component {
  state = {
    visible: false,
    actors: [],
    peliculas: [],
    name: "",
    gender: "",
    duration: "",
    synopsis: "",
    selectActors: [],
    loading: true,
    error: null,
    
  };

  async callApi(path, setName) {
    /**
     * Read
     */
    this.setState({ loading: true, error: null });

    try {
      
      const r = await Axios.get(path );
      this.setState({ loading: false, [setName]: r.data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }
  componentDidMount() {
    this.callApi("/actores", "actors");
    this.callApi("/peliculas", "peliculas");
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
    console.log(v);
  }
  //envio de datos
  sendData(v) {
    const data = {
      ...this.pickProps(["name"], v),
      ...this.pickProps(["gender"], v),
      ...this.pickProps(["duration"], v),
      ...this.pickProps(["synopsis"], v),

      actors: v.selectActors.map((id) => ({ id })),
    };
    delete data.selectActors;
    /***
     * Create
     */

    Axios.post("/peliculas/", data)
      .then(() => {
        alert("Creado Exitosamente , Para continuar cierre el cuadro de dialogo o puede agregar mas Peliculas");
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
    this.props.history.push("/formmovie");
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    window.location.reload();
    console.log(e);

    this.setState({
      visible: false,
    });
  };

 


  render() {
    if (this.state.loading === true) {
      return "Loading...";
    }
    if (this.state.error === true) {
      return `Error: ${this.state.error.message}`;
    }
    const { Title } = Typography;
    const { Option } = Select;


    const columns = [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Genero",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Duración",
        dataIndex: "duration",
        key: "duration",
      },
      {
        title: "Sinopsis",
        key: "synopsis",
        dataIndex: "synopsis",
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={"/formmovie/" + record.id}>Editar</Link>

            <Link to={"/viewmovie/" + record.id}>Ver</Link>
          </Space>
        ),
      },
    ];
    return (
      /***
       * Pantalla princiapal de peliculas
       */
      <div style={{ padding: "40px" }}>
        <Row>
          <Col flex="1 1 300px" style={{ display: "flex" }}>
            <Title>Peliculas</Title>{" "}
          </Col>
          <Col flex="0 1 100px">
            <Button
              type="primary"
              style={{ width: "200px" }}
              className="buttoncreate"
              shape="round"
              onClick={this.showModal}
              icon={<FileAddOutlined />}
            >
              Nueva pelicula
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col> {}</Col>
        </Row>
        <Row>
          <Table
            columns={columns}
            style={{ width: "1300px" }}
            dataSource={this.state.peliculas}
            key={this.state.peliculas.id }

          />
        </Row>

        {/* Modal de ingreso de datos  */}

        <Modal
          title="Ingresar Pelicula"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key="guardar"
          footer={[]}
        >
          <Row>
            <Col flex="1 1 300px" style={{ display: "flex" }}>
              <Title>Nueva pelicula</Title>{" "}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col flex="1 1 300px" style={{ display: "flex" }}>
              <Input
                style={{ width: "50%", marginLeft: "100px" }}
                value={this.state.name}
                placeholder="Nombre"
                onChange={this.setValue("name", true)}
              ></Input>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col flex="1 1 200px">
              <InputNumber
                style={{ width: "50%", marginLeft: "100px" }}
                placeholder="Duracion(Minutos)"
                onChange={this.setValue("duration")}
              ></InputNumber>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col flex="1 1 200px">
              <Input
                style={{ width: "50%", marginLeft: "100px" }}
                value={this.state.gender}
                placeholder="Genero"
                onChange={this.setValue("gender", true)}
              ></Input>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col flex="1 1 200px">
              <Input
                style={{ width: "50%", marginLeft: "100px" }}
                value={this.state.synopsis}
                placeholder="Sinopsis"
                onChange={this.setValue("synopsis", true)}
              ></Input>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col flex="1 1 200px">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "50%", marginLeft: "100px" }}
                placeholder="Seleccionar actores"
                value={this.state.selectActors}
                onChange={this.setValue("selectActors")}
              >
                {this.state.actors.map((actor) => (
                  <Option key={actor.id}>{actor.name}</Option>
                ))}
              </Select>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col flex="1 1 200px">
              <Button
                className="buttoncreate"
                type="primary"
                style={{ width: "50%", marginLeft: "100px" }}
                onClick={() => this.sendData(this.state)}
              >
                {"Guardar"}
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
export default Movies;
