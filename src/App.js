import React from 'react'
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import { AuthProvider } from './AuthContext'
import PrivateRoute from './PrivateRoute'
import { FirebaseDatabaseProvider } from "@react-firebase/database";


function App() {
  return (
    <FirebaseDatabaseProvider>
      <AuthProvider>
        <Switch>
          <PrivateRoute path='/home' component={Home} />
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </AuthProvider>
    </FirebaseDatabaseProvider>
  );
}

export default App;
