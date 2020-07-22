import React, { Component } from "react";
import './Perfilpage.css'
import { User } from "../../Utils/Globales";
import {ChangePassword} from '../../Utils/Config_API'

class Perfil extends Component {
constructor(){
    super();
    this.state={
        display:'block',
        nombre:null,
        correo:null,
        pais:null,
        pass:null,
        nuevapass:null
    }
}
componentWillMount(){
    let user=JSON.parse(sessionStorage.getItem(User));
    console.log(user.nombre_usuario);
    this.setState({
      nombre:user.nombre_usuario,
      pais:user.nombre_pais,
      correo:user.correo_usuario
    })
}
handlepassword=()=>{
    document.getElementById("changepassword").style.display=this.state.display;
    if(this.state.display==="block"){
        this.setState({
            display:"none"
        })
    }else{
        this.setState({
            display:"block"
        })
    }
}
evaluatepass=(e)=>{
    let pass2=e.target.value;
    let pass1=document.getElementById("pass1").value;
    if(pass1!==pass2){
        document.getElementById("pass2").style.borderColor="red";
        document.getElementById("pass1").style.borderColor="red";
    }else{
        document.getElementById("pass2").style.borderColor="black";
        document.getElementById("pass1").style.borderColor="black";
        this.setState({
            nuevapass:pass2
        })
    }
}
handlesetpass=(e)=>{
    let pass=e.target.value;
    this.setState({
        pass:pass
    })
}
changepassword=()=>{
    var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw2 = JSON.stringify({
                "contrasena":this.state.pass,
                "nuevacontrasena":this.state.nuevapass,
                "correo":this.state.correo
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw2,
              mode: "cors",
            };
            console.log(this.state.correo,this.state.pass,this.state.nuevapass);
            
            fetch(ChangePassword, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                  console.log(result);
                  
                if (result === 200) {
                  console.log("Ok");
                } else {
                  console.log("err");
                }
              })
              .catch((error) => console.log("error", error));
}
    render() {
      return (
          
            <div className="perfil">
                <h1 align="center">Perfil</h1>

                <label className="label">Nombre Usuario</label>
                <br/>
                <input value={this.state.nombre} type="text" className="input"></input>
                <br/>
                <label className="label">Correo</label>
                <br/>
                <input value={this.state.correo} className="input" type="text"></input>
                <br/>
                <label className="label">Pais</label>
                <br/>
                <input value={this.state.pais} className="input" type="text"></input>
                <br/>
                <br/>
                <br/>
                <button onClick={this.handlepassword}>Cambiar contraseña</button>
                <div id="changepassword">
                    <h3>Cambio de contraseña</h3>
                    <label className="label">Contraseña anterior</label>
                    <br/>
                    <input className="input" type="password" onChange={this.handlesetpass}></input>
                    <br/>
                    <label className="label">Nueva contraseña</label>
                    <br/>
                    <input id="pass1" className="input" type="password" onChange={this.evaluatepass}></input>
                    <br/>
                    <label className="label">Repetir nueva contraseña</label>
                    <br/>
                    <input id="pass2" className="input" type="password" onChange={this.evaluatepass}></input>
                    <br/>
                    <button onClick={this.changepassword}>Guardar cambios</button>
                </div>

            </div>
          
      );
    }
  }

  export default Perfil;
