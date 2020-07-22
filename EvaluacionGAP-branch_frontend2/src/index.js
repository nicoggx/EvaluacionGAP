import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { Helmet } from 'react-helmet'
import * as serviceWorker from './serviceWorker';
//esta linea es para pruebas comentar si no se esa
//import Prueba from './components/prueba-doc';
const TITLE = 'Calidad de datos';

ReactDOM.render(
  <React.StrictMode>
     <Helmet>
          <title>{ TITLE }</title>
          <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
        </Helmet>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
