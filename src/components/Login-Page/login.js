import React,{Component} from 'react'
import './login.css';
import logo from './../../img/Logo.png';
import {User} from '../../Utils/Globales';


export default class Form extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            user:null,
            error:null,
            token:"qwasdsvgr2344"
        }
        this.changeuser=this.changeuser.bind(this);
        this.changepass=this.changepass.bind(this);
        this.handleauth=this.handleauth.bind(this);
      }
    componentWillMount(){
        sessionStorage.clear()
    }
    changeuser(e){
        this.setState({
            user:e.target.value
        })
         
    }
    changepass(e){
        this.setState({
            pass:e.target.value
        })
    }
    handleauth(e){
        e.preventDefault()
        if(this.state.user != null && this.state.pass){
        
          
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
          var details = {
            'email': `${this.state.user}`,
            'password': `${this.state.pass}`,
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
            fetch("http://localhost:5000/user/iniciarsesion", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                console.log(result.data.info);
                
                if (result.data.login) {
                  sessionStorage.setItem(User, [result.data.info.idempresa,result.data.info.idusuario,result.data.info.tipoUsuario]);
                  window.location = "/Home";
                } else {
                  this.seterr("*Usuario y/o contraseña incorrecta")
                }
              })
              .catch((error) => console.log("error", error));
        }else{
          this.seterr("*Debe ingresar Usuario y Contraseña")
        }
    }
    seterr(message){
      document.getElementById("error").style.display = "block";
      this.setState({
        error:message
      })
    }
    render(){
        return(
            <div id="loginclass2" >
            <form class="backlogin">
                <img src={logo} class="logo-img" alt="Logo EY" ></img>
                <p align="center">
                    <label class="label1">Correo Electronico </label>
                    <br></br>
                    <input
                    onChange={this.changeuser}
                    id="name"
                    name="user"
                    class="input_style"
                    placeholder=""
                    >
                    </input>
                    <br></br>
                    <br></br>
                    <br></br>   
                    <br></br>
                    <label>Contraseña </label>
                    <br></br>
                    <input
                    onChange={this.changepass}
                    type="password"
                    id="pass"
                    name="password"
                    class="input_style"
                    placeholder=""
                    >
                    </input>
                    <p id="error">{this.state.error}</p>
                    <br></br>
                    <br/>
                    <br/>
                     <button onClick={this.handleauth}  class="buttonlogin">Iniciar Sesion</button>
                </p>
            </form>
            </div>
        )
}

}