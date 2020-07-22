import React, { Component } from "react";
import Data from './Entrevista-Gap.json'
import './Cuestionario.css'
import { Checkbox } from "antd";


class cuestionario extends Component {
    constructor(){
    super();
    this.state={
        nentrevis:[],
        usuario:null,
        empresa:null,
        nombrearchivo:null
}
}

async handlene(){
let n=document.getElementById("nentrevistados").value;
let ne=[]

for (let i=0; i< n;i++){
  console.log(i);
  ne.push(i+1)
}
await this.setState({nentrevis:ne})

}
async handleno(){
  let nombre=document.getElementById("Nombrearch").value;

  await this.setState({nombrearchivo:nombre})
  
  }
handleUpdate(){
  let json=`[[{"usuario":"usuario1","idempresa":"empresa","nombreArchivo":"nombre de analisis"}],[`
  let dat=[];
  Data.map((key)=>{
    key.Seccion.map((Sub)=>{
      Sub.Data.map((data)=>{
        this.state.nentrevis.map((entrevistado)=>{
//`${entrevistado}${Sub.Chck}`
          dat.push(document.getElementById(`${entrevistado}${Sub.Chck}`).checked)
          
        })
        
        json+=`{"Dominio":"${key.Dominio}","chck":"${Sub.Chck}","data":"${data.Control}","values":"${dat}"},`
        dat=[]
        
      })
    })
  })
  let jsonfinal=json.substr(0,json.length-1)+"]]";  
  

  var raw2 = JSON.stringify(jsonfinal);
  //var raw2 = JSON.parse(jsonfinal);
  console.log(this.state.nombrearchivo);

  var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var details = {
    'idusuario': `2`,
    'data': `${jsonfinal}`,
    'nombreGAP': `${this.state.nombrearchivo}`
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
    console.log("track");
    fetch("http://localhost:5000/gap/evaluarGAP", requestOptions)
      .then((response) => console.log(response))
      
      .catch((error) => console.log("error", error));

}
  render() {
      return (
        <div className="Quest">
        <h1 align="center">Encuesta Analisis GAP</h1>
        <label className="Nanalisis">Nombre del analisis:</label>
        <input type="text" id="Nombrearch" onChange={this.handleno.bind(this)}></input>
        <br/>
        <label className="Nentrevistados">numero de Entrevistados:</label>
        <input type="number" onChange={this.handlene.bind(this)} id="nentrevistados"></input>
        <table className="table">
        <tr>
          <td className="Dominio">Dominio</td>
          <td ClassName="SeccionyDom"><td className="Seccion">Sección</td><td className="Control">Control</td><td className="Entrevistados"> {
            this.state.nentrevis.map((key)=>
              <td className="Entrevistados">Entrevistado{key}</td>
            )
          }</td></td>
          
        </tr>
          {
            Data.map((Key)=>{
              return(
              <tr>
              <td className="Dominio">{Key.Dominio}</td>
                
              <td ClassName="SeccionyDom">{Key.Seccion.map((Sub)=>{
                return(
                  <div>
                  <tr><td className="Seccion"  >{Sub.Nseccion}</td>
                  {Sub.Data.map((data)=>{
                    return(
                      <tr ><td className="Control2">{data.Pregunta} </td>
                      {
                        this.state.nentrevis.map((key)=>
                        <td className="Entrevistados"><Checkbox id={`${key}${Sub.Chck}`}></Checkbox></td>
                        )
                      }</tr>
                    )
                  })}
                  
                  </tr>
                  </div>
                  )
               })
              }</td>
              
              </tr>
              )
            }
            )
          }
        </table>
        <button id="EnviarForm" onClick={this.handleUpdate.bind(this)}>Cargar Formulario</button>
        </div>
      );
    }
  }

  export default cuestionario;