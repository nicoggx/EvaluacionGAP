import React, { Component } from "react";
import './../css/left-menu.css';
import {User} from '../Utils/Globales'
import { Link } from "react-router-dom";



function Popup(props) {
 
      return (
        <div id ="menu" className='menu'>
        
            <p className='close' onClick={props.evento}>X</p>
            <Link className='list' to="/Home/admCuenta">Administrar Usuarios</Link>
            <Link className='list' to="/Home/admEmpresas">Administrar Empresas</Link>
            <Link className='list' to="/Home/Cuestionario-Gap">Crear Cuestionario GAP</Link>
            <Link className='list' to="/Home/Resultados-Gap">Resultados</Link>
            
      </div>
      );
  }

  export default Popup;