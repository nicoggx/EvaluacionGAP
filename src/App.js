import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login-Page/login'
import routes from './Config/routes';


function App(){
  return(
    <Router>
      <Switch>
        {routes.map((route,index) => (
          <Routerwithsubroutes key={index} {...route}/>
        ))}
        <Route path='/Login' exact ><Login/></Route>
      </Switch>
    </Router>
  );
}
function Routerwithsubroutes(route){
  return (
    <Route 
    path={route.path} 
    exact={route.exact} 
    render={props => <route.component routes={route.routes} {...props} />} />
  );
}

export default App;