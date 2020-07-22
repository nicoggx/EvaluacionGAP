import React, { Component } from "react";

import './Admin-Empresa.css'
import {User} from '../..//Utils/Globales'

//import imagenes
import Delete from  '../../img/Delete.svg';
import Update from  '../../img/Update.svg';
import Add from  '../../img/Add.svg';

class PopupD extends React.Component {
  DeleteEmpresa(){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var details = {
      'idempresa': `${this.props.ids}`,
      'correo_empresa': `${this.props.correo}`,
      'idUsuario': `${this.props.user}`,
    };
    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formBody,
      };
      fetch("http://localhost:5000/empresa/eliminar", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
  }
    render() {
      return (
        <div className='popupD'>
        {console.log(this.props)}
          <div className='popupD_inner'>
            <h1>{this.props.text}</h1>
            <label>Esta seguro que desea eliminar la cuenta seleccionada</label>
            <br/>
            <br/>
            <br/>
            <br/>
            <button id="CerrarD" onClick={this.props.closePopup}>Cerrar</button>
            <button id="BorrarD" onClick={this.DeleteEmpresa.bind(this)}>Eliminar</button>
          </div>
        </div>
      );
    }
  }
class PopupU extends React.Component {
  constructor(){
    super();
    this.state={
        nombreE:null,
        correoE:null,
        
    }
}
UpdateEmpresa(){
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  var details = {
    'idempresa':`${this.props.ids}`,
    'nombre_empresa': `${this.props.empresa}`,
    'correo_empresa': `${this.state.correoE}`,
  };
  var formBody = [];
  for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formBody,
    };
    fetch("http://localhost:5000/empresa/actualizar/9", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        
      })
      .catch((error) => console.log("error", error));
}
handlenombre(e){
  this.setState({
    nombreE:e.target.value
  })
}
handleid(e){
  this.setState({
    idE:e.target.value
  })
}
    render() {
      return (
        <div className='popupU'>
          <div className='popupU_inner'>
            <h1>{this.props.text}</h1>
            <label>Correo Referencial</label>
            <br/>
            <input type="text" align="center" onChange={this.handlenombre.bind(this)}></input>
            <br/>
          <button id="CerrarC" onClick={this.props.closePopup}>Cerrar</button>
          <button id="CrearC" onClick={this.props.closePopup}>Modificar</button>
          </div>
        </div>
      );
    }
  }

//popup para crear una empresa
class PopupC extends React.Component {
  constructor(){
    super();
    this.state={
        nombreE:null,
        correoE:null,
        idE:null
    }
}
AddEmpresa(){
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  var details = {
    'nombre_empresa': `${this.state.nombreE}`,
    'correo_empresa': `${this.state.correoE}`,
    'idUsuario': `${this.state.idE}`,
  };
  var formBody = [];
  for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formBody,
    };
    fetch("http://localhost:5000/empresa/crear", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        if (result.data.login) {
          window.location = "/Home";
        } else {
          this.seterr("*Usuario y/o contraseña incorrecta")
        }
      })
      .catch((error) => console.log("error", error));


}
handlenombre(e){
  console.log(e.target.value);
  
  this.setState({
    nombreE:e.target.value
  })
}
handlecorreo(e){
  console.log(e.target.value);
  
  this.setState({
    correoE:e.target.value
  })
}
handleid(e){
  console.log(e.target.value);
  
  this.setState({
    idE:e.target.value
  })
}
    render() {
      return (
        <div className='popupC'>
          <div className='popupC_inner'>
            <h1>{this.props.text}</h1>
            <label>Nombre de la empresa </label>
            <br/>
            <input type="text" align="center" onChange={this.handlenombre.bind(this)}></input>
            <br/>
            <label>Correo de la empresa </label>
            <br/>
            <input type="text" align="center" onChange={this.handlecorreo.bind(this)}></input>
            <br/>
          <button id="CerrarC" onClick={this.props.closePopup}>Cerrar</button>
          <button id="CrearC" onClick={this.AddEmpresa.bind(this)}>Crear cuenta</button>
          </div>
        </div>
      );
    }
  }

class CreateAcc extends Component {
    constructor(){
    super();
    this.state={
        correo:null,
        Id:null,
        user:null,
        nombreempresa:null,
        pass:null,
        data:[],
        showPopupC: false,
        showPopupU: false,
        showPopupD: false,
        namepopup: null
    }
}
togglePopupC() {
    this.setState({
      showPopupC: !this.state.showPopupC
    });
  }
togglePopupU() {
    this.setState({
      showPopupU: !this.state.showPopupU
    });
}
async handlePopupU(id,nombreempresa) {
  await this.setState({
    Id: id,
    nombreempresa:nombreempresa
  });
  this.togglePopupU()
  
}
togglePopupD() {
    this.setState({
      showPopupD: !this.state.showPopupD
    });
}
async handlePopupD(id,correo,iduser) {
  console.log(id,correo,iduser);
  await this.setState({
    Id: id,
    correo: correo,
    user: iduser
  });
  this.togglePopupD()
  
}
componentDidMount(){
    this.handleUser()
}
handleUser(){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/*");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
    };
    fetch(`http://localhost:5000/empresa/listar`, requestOptions)
      .then((response) => response.json())
      .then((res) => this.setState({
            data:res.data
        }))
      .catch((error) => console.log("error"));
}
renderpag(){
  let user=sessionStorage.getItem(User);
  user=user[4]
  console.log(user);
  if(user==="1"){
    return (
      <div className="ADMUser" align="center">
          <h1>Administracion de Empresas</h1>
          <button onClick={this.togglePopupC.bind(this)} id="CrearCuenta"><img src={Add} alt ="" id="Add"></img> Crear Empresa</button>

          {this.state.showPopupC ?
          <PopupC
              text={'Registrar Usuario'}
              closePopup={this.togglePopupC.bind(this)}
          />
          : null
          }

          {this.state.showPopupU ?
          <PopupU
              ids={this.state.Id}
              empresa={this.state.nombreempresa}
              text={"Actualizar Cuenta"}
              closePopup={this.togglePopupU.bind(this)}
          />
          : null
          }

          {this.state.showPopupD ?
          <PopupD
              text={"Eliminar cuenta"}
              ids={this.state.Id}
              correo={this.state.correo}
              user={this.state.user}
              closePopup={this.togglePopupD.bind(this)}
          />
          : null
          }
          <table>
          <tr>
          <td id="Correo" align="center">Nombre Empresa</td>
          <td id="Estado" align="center">Correo referencia</td>
       
          <td id="Acciones" align="center">Acciones</td>
          </tr>
          {this.state.data.map((key)=> 
          <tr>
          <td id="Correo" align="center">{key.nombre_empresa}</td>
          <td id="Estado" align="center">{key.correo_empresa}</td>
          
          <td id="Acciones" align="center">
          <img id = "Borrar" src={Delete} alt="" onClick={()=>{this.handlePopupD(key.idempresa,key.correo_empresa,key.idusuario)}}></img>
          <img id = "Actualizar" src={Update} alt="" onClick={()=>{this.togglePopupU(key.idempresa,key.nombre_empresa)}}></img>
          </td>
          </tr>
          )}
          </table>
      </div>
    );
  }else{return(
    <div>
      <h1 align="center"> No cuenta con los permisos para ingresar a esta pagina</h1>
    </div>
  )}
}
render() {
  return(
    <div>{this.renderpag()}</div>
    )  
    }
  }

  export default CreateAcc;
 