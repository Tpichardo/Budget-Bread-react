//DEPENDECIES
import React from 'react';
import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from './util/apiURL';
import './App.css';


//Pages
import Home from './Pages/Home';
import Index from './Pages/Index';
import New from './Pages/New';
import Show from './Pages/Show';
import Edit from './Pages/Edit';
import Four0Four from './Pages/Four0Four';

//COMPONENTS
import NavBar from './Components/NavBar';

const API = apiURL()

function App() {
  const [transactions, setTransactions] = useState([])

  const addTransaction = (newTransaction) => {
    axios.post(`${API}/transactions`, newTransaction)
      .then((response) => {
        return axios.get(`${API}/transactions`)
          .then((response => {
            const { data } = response
            setTransactions(data)
          }))
      }).catch((e) => {
        console.log(e)
      })
  }

  const deleteTransaction = (index) => {
    axios.delete(`${API}/transactions/${index}`)
      .then((response) => {
        const transactionArr = [...transactions]
        transactionArr.splice(index, 1)
        setTransactions(transactionArr)
      }).catch((e) => {
        console.log(e)
      })
  }

  const updateTransaction = (updatedTransaction, index) => {
    axios.put(`${API}/transactions/${index}`, updatedTransaction)
      .then((response) => {
        const transactionArr = [...transactions]
        transactionArr[index] = updatedTransaction
        setTransactions(transactionArr)
      }).catch((e) => {
        console.log(e)
      })
  }



  useEffect(() => {
    axios.get(`${API}/transactions`).then((response) => {
      const { data } = response
      setTransactions(data)
    }).catch((e) => {
      console.log(e)
    })
  }, [])
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/transactions'>
            <Index transactions={transactions} />
          </Route>
          <Route path='/transactions/new'>
            <New addTransaction={addTransaction} />
          </Route>
          <Route exact path='/transactions/:index'>
            <Show transactions={transactions} deleteTransaction={deleteTransaction} />
          </Route>
          <Route path='/transactions/:index/edit'>
            <Edit transactions={transactions} updateTransaction={updateTransaction} />
          </Route>
          <Route path='*'>
            <Four0Four />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
