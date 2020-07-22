import React, { Component } from "react";
//import './Perfilpage.css'
import { User } from "../../Utils/Globales";


class CreateAcc extends Component {
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

    render() {
      return (
          
            <div className="perfil">
                <h1 align="center">Modificar Graficos</h1>
                <form>
                <label className="label">Nombre Usuario</label>
                <br/>
                <input value={console.log("algo")
                //this.state.nombre
                } type="text" className="input"></input>
                <br/>
                <label className="label">Correo</label>
                <br/>
                <input value={console.log("algo")
                    //this.state.correo
                } className="input" type="text"></input>
                <br/>
                <label className="label">Pais</label>
                <br/>
                <input value={console.log("algo")
                //this.state.pais
                } className="input" type="text"></input>
                <br/>
                <br/>
                <br/>
                <button onClick={console.log("algo")
                    //this.handlepasswor
                }>Crear Usuario</button>
                </form>
            </div>
      );
    }
  }

  export default CreateAcc;
