import React from 'react';
import {Route} from 'react-router-dom';
import { Layout } from 'antd';
import Burgermenu from './../img/BurgerMenu.png'
import Header from './header';
import Menul from './left-menu';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/layout.css'


export default function LayoutUser(props){
  
  const { routes } = props;
  const {Content} = Layout;
  const handleshow=()=>{
    document.getElementById("left-menu").style.display = 'none';
    document.getElementById("hamburger-menu").style.display = 'block';
    document.getElementById("border").style.display = 'block';
    document.getElementById("component").style.left = '50px';
    document.getElementById("component").style.width = '96%';


  }
  const handleshowhm=()=>{
    document.getElementById("left-menu").style.display = 'block';
    document.getElementById("component").style.left = '210px';
    document.getElementById("component").style.width = '80%';
    document.getElementById("hamburger-menu").style.display = 'none';
    document.getElementById("border").style.display = 'none';
  }
  return(
      <div id="main">
      <div className="Header">
        <Header />
      </div>
       <div id= "border">
        <img   id="hamburger-menu" className="burger-menu" src={Burgermenu} alt="Desplegar Menu" onClick={handleshowhm}></img>  
        </div>
        
        <div id="left-menu">
        <Menul evento={handleshow}/>
        </div>
        
        <Content id="component">
          <div className="Component-chld">
          <LoadRoutes routes={routes}/> 
          </div>
          
        </Content>
        </div>
      
  );
}

function LoadRoutes({routes}){

  
  return routes.map((route,index)=> (
    <Route 
    key={index}
    path={route.path}
    exact={route.exact}
    component={route.component} />
  ));
}