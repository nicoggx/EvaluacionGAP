import React, { Component } from "react";

import './Admin-User.css'
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
      'idusuario': `${this.props.id}`,
      'password': `${this.props.pass}`,
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
      fetch("http://localhost:5000/user/eliminar", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.props.updatetable()
          this.props.closePopup()
        })
        .catch((error) => console.log("error", error));
  }  
    render() {
      return (
        <div className='popupD'>
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
        Correo:null,
        TipoUser:null,
    }
    this.handleTUser = this.handleTUser.bind(this);
}
UpdateUser(){
  console.log(this.state.Correo,this.state.Correo);
  if((this.state.Correo!=="" && this.state.Correo.indexOf("@")!==-1)  && this.state.TipoUser!=="Ninguno"){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var details = {
    'email': `${this.state.Correo}`,
    'tipoUsuario': `${this.state.TipoUser}`,
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
    fetch(`http://localhost:5000/user/actualizar/${this.props.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        this.props.updatetable()
        this.props.closePopup()
      })
      .catch((error) => console.log("error", error));
  }
}
handleUser(){
  let correo=document.getElementById("usuario").value;
  console.log(correo);
  this.setState({
    Correo:correo
  })
  }
  handleTUser(){
    let h = document.getElementById("User").value;
    console.log(h)
    this.setState({
      TipoUser:h
    })
  }
    render() {
      return (
        <div className='popupU'>
          <div className='popupU_inner'>
            {console.log(this.props.id)}
            <h1>{this.props.text}</h1>
            <label>Correo </label>
            <br/>
            <input type="text" align="center" id="usuario" onChange={this.handleUser.bind(this)}></input>
            <br/>
            <label>Tipo de usuario </label>
            <br/>
            <select name="Combo1" id="User" onChange={()=>this.handleTUser()}>
              <option value="Ninguno" selected>Ninguno</option>
              <option value="1">Administrador</option>
              <option value="2">Entrevistador</option>
            </select>
            <br/>
          <button id="CerrarC" onClick={this.props.closePopup}>Cerrar</button>
          <button id="CrearC" onClick={this.UpdateUser.bind(this)}>Modificar</button>
          </div>
        </div> 
      );
    }
  }
class PopupC extends React.Component {
  constructor(){
    super();
    this.state={
        Correo:null,
        Contraseña:null,
        TipoUser:null,
        Empresa:null,
        Data:[]
    }
    this.handleTUser = this.handleTUser.bind(this);
    this.handleEmpresa = this.handleEmpresa.bind(this);
}
async componentDidMount(){
  await this.getEmpresas()
  console.log(this.state.Data);
}

async getEmpresas(){
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/*");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
  };
  await fetch(`http://localhost:5000/empresa/listar`, requestOptions)
    .then((response) => response.json())
    .then((res) => {this.setState({ Data:res.data})})
    .catch((error) => console.log("error"));
}
handleUser(){
let correo=document.getElementById("usuario").value;
console.log(correo);
this.setState({
  Correo:correo
})
}
handlepass(){
let pass=document.getElementById("Pass").value;
console.log(pass);
this.setState({
  Contraseña:pass
})
}
handleEmpresa(){
  let h = document.getElementById("Empresas").value;
  console.log(h)
  this.setState({
    Empresa:h
  })
}
handleTUser(){
  let h = document.getElementById("User").value;
  console.log(h)
  this.setState({
    TipoUser:h
  })
}
CreateACC(){
  console.log(this.state.Correo,this.state.Contraseña,this.state.Empresa,this.state.TipoUser);
  if((this.state.Correo!=="" && this.state.Correo.indexOf("@")!==-1) && this.state.Contraseña!=="" && this.state.Empresa!=="Ninguno" && this.state.TipoUser!=="Ninguno"){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var details = {
    'email': `${this.state.Correo}`,
    'password': `${this.state.Contraseña}`,
    'tipoUsuario': `${this.state.TipoUser}`,
    'idempresa': `${this.state.Empresa}`,
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
    fetch("http://localhost:5000/user/crear", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        this.props.updatetable()
        this.props.closePopup()
      })
      .catch((error) => console.log("error", error));
  }
}
    render() {
      return (
        <div className='popupC'>
          <div className='popupC_inner'>
            
            <h1>{this.props.text}</h1>
            <label>Correo </label>
            <br/>
            <input type="text" align="center" id="usuario" onChange={this.handleUser.bind(this)}></input>
            <br/>
            <label>Contraseña </label>
            <br/>
            <input type="Password" align="center" id="Pass" onChange={this.handlepass.bind(this)}></input>
            <br/>
            <label>Tipo de usuario </label>
            <br/>
            <select name="Combo1" id="User" onChange={()=>this.handleTUser()}>
              <option value="Ninguno" selected>Ninguno</option>
              <option value="1">Administrador</option>
              <option value="2">Entrevistador</option>
            </select>
            <br/>
            <label>Empresa </label>
            <br/>
            <select name="Combo1" id="Empresas" onChange={()=>this.handleEmpresa()}>
              <option value="Ninguno" selected>Ninguno</option>
              {this.state.Data.map((key)=>
                <option value={key.idempresa}>{key.nombre_empresa}</option>
              )}
            </select>
            <br/>
          <button id="CerrarC" onClick={this.props.closePopup}>Cerrar</button>
          <button id="CrearC" onClick={this.CreateACC.bind(this)}>Crear cuenta</button>
          </div>
        </div>
      );
    }
  }

class CreateAcc extends Component {
    constructor(){
    super();
    this.state={
        display:'block',
        nombre:null,
        correo:null,
        pais:null,
        pass:null,
        data:[],
        id:null,
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
togglePopupU2(id) {
    this.setState({
      id: id
    });
    this.togglePopupU()
}
  togglePopupU() {
    this.setState({
      showPopupU: !this.state.showPopupU
    });
}
togglePopupD2(id,pass) {
  this.setState({
    id:id,
    pass:pass
  });
  this.togglePopupD()
}
togglePopupD() {
    this.setState({
      showPopupD: !this.state.showPopupD
    });
}
componentWillMount(){
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
    fetch(`http://localhost:5000/user/listar`, requestOptions)
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
          <h1>Administracion de Usuarios</h1>
          <button onClick={this.togglePopupC.bind(this)} id="CrearCuenta"><img src={Add} alt ="" id="Add"></img> Crear Usuario</button>

          {this.state.showPopupC ?
          <PopupC
              text={'Registrar Usuario'}
              updatetable={this.handleUser.bind(this)}
              closePopup={this.togglePopupC.bind(this)}
          />
          : null
          }

          {this.state.showPopupU ?
          <PopupU
              text={"Actualizar Cuenta"}
              id={this.state.id}
              updatetable={this.handleUser.bind(this)}
              closePopup={this.togglePopupU.bind(this)}
          />
          : null
          }

          {this.state.showPopupD ?
          <PopupD
              id={this.state.id}
              pass={this.state.pass}
              updatetable={this.handleUser.bind(this)}
              text={"Eliminar cuenta"}
              closePopup={this.togglePopupD.bind(this)}
          />
          : null
          }
          <table className="User-Table">
          <tr>
          <td id="Correo" align="center">Nombre usuario</td>
          <td id="Empresa" align="center">Empresa</td>
          <td id="TipoUsuario" align="center">Tipo de Usuario</td>
          <td id="Empresa" align="center">Fecha Creacion</td>
          <td id="Acciones" align="center">Acciones</td>
          </tr>
          {this.state.data.map((key)=> 
          <tr>
          <td id="Correo" align="center">{key.email}</td>
          <td id="Estado" align="center">{key.empresa.nombre_empresa}</td>
          <td id="TipoUsuario" align="center">{key.tipoUsuario===1 ? "ADMINISTRADOR":"ENTREVISTADOR" }</td>
          <td id="Empresa" align="center">{key.createdAt.substr(0,10)}</td>
          <td id="Acciones" align="center">
          <img id = "Borrar" src={Delete} alt="" onClick={()=>this.togglePopupD2(key.idusuario,key.password)}></img>
          <img id = "Actualizar" src={Update} alt="" onClick={()=>this.togglePopupU2(key.idusuario)}></img>
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
 