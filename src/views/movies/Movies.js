import React, { Component } from "react";
import { Row, Col ,Divider ,Typography,Button ,Table, Tag, Space } from 'antd';
import butoncreate from '../../assets/App.css';

import {
 FileAddOutlined

} from '@ant-design/icons';


class Movies extends Component {

    render() {
      const { Title } = Typography;

      const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
    return (
      
      <div style={{padding:"40px"}}>
        
        <Row>
          <Col flex="1 1 300px" style={{display:"flex"}}><Title>Peliculas</Title> </Col>
          <Col flex="0 1 100px">
        
            <Button type="primary" style={{width:"200px"}} className="buttoncreate" shape="round" icon={<FileAddOutlined />} >
          Nueva pelicula
        </Button>
          </Col>
          
        </Row>  
         <Divider />
        <Row>
          
          <Table columns={columns} style={{width:"1300px"}} dataSource={data} />
        </Row>
       
      </div>
    );
  }


}
export default Movies;