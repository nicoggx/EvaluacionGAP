import React, { Component } from "react";
import './../css/header.css';
import logo from './../img/Logo.png'
import user from './../img/user.svg'
import { User } from "../Utils/Globales";
import { Link } from "react-router-dom";


class Header extends Component {
  constructor(){
    super();
    this.state={
      
      show:"block"
    }
  }
  /*componentWillMount(){
    let nombre=JSON.parse(sessionStorage.getItem(User));
    console.log(nombre.nombre_usuario);
    this.setState({
      nombre:nombre.nombre_usuario
    })
  }*/
  showmenu=()=>{
    document.getElementById("Menu").style.display= this.state.show;
    if(this.state.show==="block"){
      this.setState({
        show:"none"
      })
    }else{
      this.setState({
        show:"block"
      })
    }

  }
    render() {
      return (
            <div class="topnav">
                <img src={logo} class="logo-imgh" alt="Logo EY"></img>
                
                <img src={user} class="perfil-img" id="buton_usuario" alt="" onClick={this.showmenu}></img>
                <div>
                <ul id="Menu">
                  <li className="option" onClick={()=>(window.location = "/Home/perfil")}>Perfil</li>
                  <li className="option" onClick={()=>(window.location = "/Login")}>Cerrar Sesion</li>
                </ul>
                </div>
            </div>
          
      );
    }
  }

  export default Header;
