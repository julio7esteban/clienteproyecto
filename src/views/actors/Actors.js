import React, { Component } from "react";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Upload,
  message,
  Table,
  Modal,
  Space,
  Input,
  Select,
  InputNumber,
} from "antd";
import butoncreate from "../../assets/App.css";
import Axios from "axios";
import { withRouter, Link } from "react-router-dom";

import {
  FileAddOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

class Actors extends Component {
  state = {
    visible: false,
    actors: [],
    peliculas: [],
    name: "",
    age: "",
    selectActors: [],
    loading: true,
    error: null,
  };
  //funciones subir fotos
  getBase64(img, callback) {
   const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  //----------------------------
  /**
   * Read
   */

  async callApi(path, setName) {
    this.setState({ loading: true, error: null });

    try {
      const r = await Axios.get(path);
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
      ...this.pickProps(["age"], v),


      actors: v.selectActors.map((id) => ({ id })),
    };
    delete data.selectActors;
    /***
     * Create
     */

    Axios.post("/actores/", data)
      .then(() => {
        alert(
          "Creado Exitosamente ,Para continuar cierre el cuadro de dialogo o puede agregar mas Actores"
        );
      })
      .catch((er) => {
        console.error(er);
        alert("Error revise la consola");
      });
    // location.href ='/ruta'
    //{this.state.peliculas.map((v)=>`${JSON.stringify(v)}`)}
    //modal Funciones
  }

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
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,

        })
      );
    }
  };

  render() {
    const { Title } = Typography;
    const { Option } = Select;
    if (this.state.loading === true) {
      return "Loading...";
    }
    if (this.state.error === true) {
      return `Error: ${this.state.error.message}`;
    }
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const columns = [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Edad",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Foto",
        dataIndex: "photo",
        key: "photo",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={"/editactor/" + record.id}>Editar</Link>
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
            <Title>Actores</Title>{" "}
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
              Nuevo Actor
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
            dataSource={this.state.actors}
            key={this.state.peliculas.id}
          />
        </Row>

        {/* Modal de ingreso de datos  */}

        <Modal
          title="Ingresar Actor"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key="guardar"
          footer={[]}
        >
          <Row>
            <Col flex="1 1 300px" style={{ display: "flex" }}>
              <Title>Nuevo Actor</Title>{" "}
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
                placeholder="Edad"
                onChange={this.setValue("age")}
              ></InputNumber>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col
              flex="1 1 200px"
              style={{  marginLeft: "150px" }}
            >
              <Upload
                style={{ marginLeft: "20px" }}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
          </Row>
          &nbsp;
        
         
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
export default Actors;
