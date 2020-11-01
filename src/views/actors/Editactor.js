import React, { Component, useEffect } from "react";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  message,
  Upload,
  Input,
  InputNumber,
  Select,
} from "antd";
import "../../assets/App.css";
import Axios from "axios";
import { FileAddOutlined,
  LoadingOutlined,BackwardOutlined,
  PlusOutlined, } from "@ant-design/icons";

class Editactor extends Component {
  state = {
    actors: [],
    
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

  async callApi(path, setName) {
    /**
     * Read
     */
    const r = await Axios.get(path + this.props.match.params.editid);
    this.setState({ [setName]: r.data });
  }

  componentDidMount() {
    this.callApi("/actores/", "actors");
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
      ...this.pickProps(["name"],v),
      ...this.pickProps(["age"],v),
    };

    /***
     * Create
     */

    Axios.patch("/actores/" + this.props.match.params.editid, data)
      .then(() => {
        alert("Actulizado");
        this.handleClick();
      })
      .catch((er) => {
        console.error(er);
        alert("Error al actualizar o no se a Cambiado nada");
      });
    //{this.state.peliculas.map((v)=>`${JSON.stringify(v)}`)} para desplegar json

    //modal Funciones
  }
  handleClick = () => {
    this.props.history.push("/actors");
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({});
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

    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <div style={{ padding: "40px" }}>
        <Row>
          <Col flex="1 1 300px" style={{ display: "flex" }}>
            <Title>Actulizar Actor</Title>{" "}
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
            {this.state.actors.map((acto) => (
              <Input
                style={{ width: "30%" }}
                defaultValue={acto.name}
                value={this.state.actors.name}
                placeholder="Nombre"
                onChange={this.setValue("name", true)}
              ></Input>
            ))}
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col flex="1 1 200px">
            {this.state.actors.map((acto) => (
              <InputNumber
                style={{ width: "30%" }}
                defaultValue={acto.age}
                placeholder="Edad"
                onChange={this.setValue("age")}
              ></InputNumber>
            ))}
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col flex="1 1 200px">
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
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
        <Row>
          <Col flex="1 1 200px">
            <Button
              className="buttoncreate"
              type="primary"
              style={{ width: "30%" }}
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

export default Editactor;
