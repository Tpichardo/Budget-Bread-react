//DEPENDECIES
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss'

//BOOSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';


//Pages
import Home from './Pages/Home.js';
import Index from './Pages/Index.js';
import New from './Pages/New.js';
import Show from './Pages/Show.js';
import Edit from './Pages/Edit.js';
import Four0Four from './Pages/Four0Four.js';
import SignIn from './Components/SignIn.js';
import SignUp from './Components/SignUp.js';

//COMPONENTS
import NavBar from './Components/NavBar.js';
import User from './Components/User.js';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/user'>
            <User />
          </Route>
          <Route exact path='/transactions'>
            <Index />
          </Route>
          <Route path='/transactions/new'>
            <New />
          </Route>
          <Route exact path='/transactions/:index'>
            <Show />
          </Route>
          <Route path='/transactions/:index/edit'>
            <Edit />
          </Route>
          <Route path='*'>
            <Four0Four />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
