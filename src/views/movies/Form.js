import React, { Component } from "react";
import { Row, Col ,Divider ,Typography,Button ,Table, Tag, Space } from 'antd';
import  '../../assets/App.css';

import {
 FileAddOutlined

} from '@ant-design/icons';


class Form extends Component {

    render() {
      const { Title } = Typography;

     
    return (
      
      <div style={{padding:"40px"}}>
        
        <Row>
          <Col flex="1 1 200px" ><Title>Nueva Pelicula</Title> </Col>
          
        </Row>  
         <Divider />
        <Row>
          <Col flex="1 1 200px"></Col>
          <Col flex="0 1 300px"></Col>
          
         
        </Row>
       
      </div>
    );
  }


}
export default Form;