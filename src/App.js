import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home.js';
import Index from './Pages/Index.js';
import New from './Pages/New.js';
import Show from './Pages/Show.js';
import Edit from './Pages/Edit.js';
import Four0Four from './Pages/Four0Four.js';

import SignIn from './Components/SignIn.js';
import SignUp from './Components/SignUp.js';
import NavBar from './Components/NavBar.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

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
          <Route exact path='/transactions'>
            <Index />
          </Route>
          <Route path='/transactions/new'>
            <New />
          </Route>
          <Route exact path='/transactions/:id'>
            <Show />
          </Route>
          <Route path='/transactions/:id/edit'>
            <Edit />
          </Route>
          <Route path='*'>
            <Four0Four />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
