import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Tab from './Tab';
import EditPayment from './EditPayment';
import NewPayment from './NewPayment';
import {BrowserRouter, Switch, Route} from "react-router-dom";
function App() {

const [currentUser, setCurrentUser] = useState("")


useEffect(() => {
  fetch('/auth')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setCurrentUser(user));
      }
    });
}, []);

//SET DATA FOR THE TAB.JS COMPONENT TAB LIST AND SELECTED TAB. ADDITIONALLY SET THE TRANSITION LEFT STATE TO TRUE ON THE TAB.JS COMPONENT

const [left, setLeft] = useState(false)
const [data, setData] = useState({})
const [selectedTab, setSelectedTab] = useState("")

useEffect(() => {
    fetch("/tabs")
    .then( res =>{
        if(res.ok){
            res.json().then(data => setData(data))
        }
    })

}, [])

useEffect(() => {
  if(Array.isArray(data)){
    data.filter((tabs)=>{
      if(tabs.id == selectedTab || tabs.id == selectedTab.id){
          setSelectedTab(tabs)
      }
  })
  }
}, [data, selectedTab])

function handleTransitionLeft(id){
  setLeft(!left)
  setSelectedTab(id)
}

function handleClose(){
  setLeft(false)
}

function handleUpdateTab(res){
  const newData = data.map((tab)=>{
    if(tab.id === res.tab_id){
      const newPayments = tab.payments.map((payment)=>{
        console.log(tab, "1")
        console.log(res, "2")
        if(payment.id === res.id){
          console.log(payment.user, "3")
          return {
            ...payment,
            amount: res.amount,
            description: res.description,
            category: res.category,
            created_at: res.created_at,
            user_id: res.user_id,
            user: findNewPayer(res, tab)
          }
        } else {
          return payment
        }
      })
      return {
        ...tab,
        payments: newPayments
      }
    } else {
      return tab
    }
  })
  setData(newData)
  }

  // console.log(data[0].payments[0], "data")

  function findNewPayer(res, tab){
    let newUser = tab.users.filter((user)=>{
      if(user.id == res.user_id){
        return user
      }
    })
    return newUser[0]
  }

// if(!currentUser) return <div className={"align-content-center"}><Login setCurrentUser={setCurrentUser}/></div>

  return (
    <>
    <div className=" align-content-center">
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Tab tabList={data} handleTransitionLeft={handleTransitionLeft} 
          left={left} selectedTab={selectedTab} setSelectedTab={setSelectedTab} 
          handleClose={handleClose}/>
        </Route>
        <Route path="/payment/:id">
          <EditPayment selectedTab={selectedTab} handleUpdateTab=
          {handleUpdateTab}/>
        </Route>
      </Switch>
      </BrowserRouter>

    </div>
    </>
  );
}

export default App;
