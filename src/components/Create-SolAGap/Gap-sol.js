import React, { Component } from "react";
//import './Perfilpage.css'
import {Pie} from 'react-chartjs-2'


class GapxAxsol extends Component {
    constructor(){
    super();
    this.state={
        display:'block',
        data:{
        labels:["google","amazon","youtube"],
        datasets:[{
            data:[50.0,25.0,25.0],
            backgroundColor:["#FF0000","blue","green"]
        }]
        },
        opciones:{responsive:true}
    }
}

    render() {
      return (
            <div className="perfil">
                <h1 align="center">Graficos de empresa X</h1>
                <table>
                    <tr>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                    </tr>
                    <tr>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                        <td><Pie data={this.state.data} options={this.state.opciones}></Pie></td>
                    </tr>
                </table>
            </div>
      );
    }
  }

  export default GapxAxsol;
