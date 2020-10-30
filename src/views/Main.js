import React, { createElement, } from 'react';
import '../assets/App.css';
import { Button, DatePicker, version ,Image} from "antd";
import "antd/dist/antd.css";
import {
  Route,BrowserRouter,Switch,Link, NavLink} from "react-router-dom";

import logo from '../images/logo.svg';

import Movie from "./movies/Movies";
import Actors from "./actors/Actors";
import FormMovie from "./movies/Form";
import Home from "./Home";

import { Layout, Menu} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DesktopOutlined,
  PieChartOutlined,
  HomeOutlined,
  FileOutlined,
  TeamOutlined,
  PlayCircleOutlined

} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class App extends React.Component{
   state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


render(){
      const { collapsed } = this.state;
  return (
    <div className="App">
    <Layout  >
        <Header className="site-layout-background" style={{ padding:0  }}>

                
           
                    <a id="logo" href="/" style={{ display:"flex" ,width:"170px" }}>
                        <Image alt="logo"  src={logo}></Image>
                        <div style={{  fontSize:"25px", color:"whitesmoke"}}> Peliculas </div>
                    </a>
                  
                
            
              
              
                
            
          </Header>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <BrowserRouter>

            
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="0">

              Menu
                
            </Menu.Item>
            <Menu.Item key="1" icon={<HomeOutlined />}>

              <a  href="/" >Incio</a>
                
            </Menu.Item>
            <Menu.Item key="2" icon={<PlayCircleOutlined />}   >
            
            <a href="/movies" >Peliculas</a>
            
                        
             
                
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                <a  href="/actors" >Actores</a>
            
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu> */}
            
          </Menu>
          </BrowserRouter>
        </Sider>

          <Layout className="site-layout">
          
          <Content className="site-layout-background" style={{margin: '24px 16px',padding: 24, minHeight: 280,}}>
             <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/movies" component={Movie} />
                  <Route  exact path="/actors" component={Actors} />
                  <Route exact path="/formmovie" component={FormMovie} />
                </Switch>
              </BrowserRouter>
          
          </Content>
        </Layout>

          </Layout>
        
      
      </Layout>
    </div>
  );
}
}
export default App;