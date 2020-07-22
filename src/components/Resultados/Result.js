import React, { Component } from "react";
//import './Perfilpage.css'
import {Pie} from 'react-chartjs-2'
import { User } from "../../Utils/Globales";
import Download from '../../img/Download.svg'
import './Result.css'
class GapxAxsol extends Component {
    constructor(){
    super();
    this.state={
        list:[1],
        list2:[1],
        empresa:null
    }
}
async componentWillMount(){
    await this.setempresa()
    await this.handleData()
    await this.handleData2()
    console.log(this.state.list);
}
setempresa(){
    let user=sessionStorage.getItem(User);
  user=user[2]
  this.setState({empresa:user})
}
Download(id,Nombre){
    let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/*");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
  };
fetch(`http://localhost:5000/gap/exportarGAP/${id}`, requestOptions)
    .then((response) =>  {
    if (response.status === 200) {
        return response.blob().then((b) => {
          var a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.setAttribute("download", `${Nombre}`);
          a.click();
        });
      } else {
        console.log("error");
      }})


    .catch((error) => console.log("error"));
}
handleData(){
    let list1=[]
    var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
          var details = {'idusuario':this.state.empresa
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
            fetch("http://localhost:5000/gap/listarGAP", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                  console.log(result.data[0]);
                for(let i in result.data[0]) {
                    list1.push(result.data[0][i])
                }
                
                this.setState({list:list1})
               
              })
              .catch((error) => console.log("error", error));
}
handleData2(){
    let list1=[]
    var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
          var details = {'idusuario':this.state.empresa
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
            fetch("http://localhost:5000/gap/listarGAP", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                console.log(result.data);
                for(let i in result.data[0]) {
                    list1.push(result.data[0][i])
                }
                this.setState({list2:list1})
               
              })
              .catch((error) => console.log("error", error));
}
renderpag(){
    let user=sessionStorage.getItem(User);
    user=user[4]
    console.log(user);
    if(user==="1"){
        return (
            <div className="perfil">
                <h1 align="center">Resultados Analisis Gap</h1>
                <table className="TablaRes">
                    <tr>
                        <td className="NombreA" align="center">Nombre Analisis</td>
                        <td className="Resp" align="center">Responsable</td>
                        <td className="Fecha" align="center">Fecha</td>
                        <td className="ReorteO" align="center">Reporte online</td>
                        <td className="ReporteD" align="center">Descargar Reporte</td>
                        <td className="Conclusiones" align="center">Ver Conclusiones</td>
                    </tr>
                  
                    {this.state.list.map((Key)=>
                        <tr>
                        <td className="NombreA" align="center">{Key.nombreAnalisis}</td>
                        <td className="Resp" align="center">{Key.email}</td>
                        <td className="Fecha" align="center">{Key.fecha_creacion}</td>
                        <td className="ReorteO" align="center">Reporte online</td>
                        <td className="ReporteD" align="center"><img src={Download} alt="Logo de descarga" onClick={()=>this.Download(1,Key.nombreAnalisis)} id="iconDownlaod"></img></td>
                        <td className="Conclusiones" align="center">Ver Conclusiones</td>
                        </tr>    
                    )}
                 
                </table>
            </div>
      );
    }else{
        return (
            <div className="perfil">
                <h1 align="center">Resultados Analisis Gap</h1>
                <table className="TablaRes">
                    <tr>
                        <td className="NombreA" align="center">Nombre Analisis</td>
                        <td className="Resp" align="center">Responsable</td>
                        <td className="Fecha" align="center">Fecha</td>
                        <td className="ReorteO" align="center">Reporte online</td>
                        <td className="ReporteD" align="center">Descargar Reporte</td>
                        <td className="Conclusiones" align="center">Ver Conclusiones</td>
                    </tr>
                  
                    {this.state.list2.map((Key)=>
                        <tr>
                        <td className="NombreA" align="center">{Key.nombreAnalisis}</td>
                        <td className="Resp" align="center">{Key.email}</td>
                        <td className="Fecha" align="center">{Key.fecha_creacion}</td>
                        <td className="ReorteO" align="center">Reporte online</td>
                        <td className="ReporteD" align="center"><img src={Download} alt="Logo de descarga" onClick={()=>this.Download(1,Key.nombreAnalisis)} id="iconDownlaod"></img></td>
                        <td className="Conclusiones" align="center">Ver Conclusiones</td>
                        </tr>    
                    )}
                 
                </table>
            </div>
      );
    }}
    render() {
      return (
            <div className="perfil">
                <h1 align="center">Resultados Analisis Gap</h1>
                <table className="TablaRes">
                    <tr>
                        <td className="NombreA" align="center">Nombre Analisis</td>
                        <td className="Resp" align="center">Responsable</td>
                        <td className="Fecha" align="center">Fecha</td>
                        <td className="ReorteO" align="center">Reporte online</td>
                        <td className="ReporteD" align="center">Descargar Reporte</td>
                        <td className="Conclusiones" align="center">Ver Conclusiones</td>
                    </tr>
                  
                    {this.state.list.map((Key)=>
                        <tr>
                        {console.log(Key)}
                        <td className="NombreA" align="center">{Key.nombreAnalisis}</td>
                        <td className="Resp" align="center">{Key.email}</td>
                        <td className="Fecha" align="center">{Key.fecha_creacion}</td>
                        <td className="ReorteO" align="center">Reporte online</td>
                        <td className="ReporteD" align="center"><img src={Download} alt="Logo de descarga" onClick={()=>this.Download(Key.idgap,Key.nombreAnalisis)} id="iconDownlaod"></img></td>
                        <td className="Conclusiones" align="center">Ver Conclusiones</td>
                        </tr>    
                    )}
                 
                </table>
            </div>
      );
    }
  }

  export default GapxAxsol;
