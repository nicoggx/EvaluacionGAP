# EvaluacionGAP
Instrucciones:
Para poder ejecutar ambos servicios tanto como front como back-end se debe contemplar las siguientes actividades previas 1)tener instalado programa Xampp 2)Tener Mysql 3)Tener instalado Nodejs 4)Tener instalado Reactjs 5)Tener Conexion A internet para poder levantar los servicios una vez iniciado xampp y ejecutado el servidor mysql y apache se debe dirigir a la pagina local http://localhost/phpmyadmin/ y crear una nueva base de datos con el nombre de "evaluaciongap" paso siguiente debe dirigirse a la carpeta "EvaluacionGAP" una vez dentro en una terminal ubicada en la carpeta actual(dentro de EvaluacionGAP) debera ejecutar el comando "npm install" luego de ejecutar la instalacion dirigirse a la carpeta "src" abrir una terminal en la ubicacion y ejecutar el comando "node index.js"

Para poder ejecutar la pagina web en local debera ubicarse en la carpeta "hitox03" una vez dentro debera abrir una terminal en la cual debera ejecutar el siguiente comando "npm install" y una vez realizada la instalacion debera ejecutar el comando "npm start" se ejecutara un navegador en el cual debera escribir la url "http://localhost:3000/Login"


#Es necesario contar con NodeJS 12.0.16 y npm >=6

#Instalar dependencias Evaluacion GAP Backend
npm install

#Instalar nodemon para live server
npm install nodemon

#Iniciar proyecto
nodemon src/index.js
