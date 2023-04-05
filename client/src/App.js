import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Tab from './Tab';
import EditPayment from './EditPayment';
import NewPayment from './NewPayment';
import NewTab from './NewTab';
import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
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
        if(payment.id === res.id){
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

  function findNewPayer(res, tab){
    let newUser = tab.users.filter((user)=>{
      if(user.id == res.user_id){
        return user
      }
    })
    return newUser[0]
  }

  function handleNewPayment(res){
    console.log(res, "res")
    const newData = data.map((tab)=>{
      if(res.id == tab.id){
        return res 
      }else{
        return tab
      }
    })
    setData(newData)
  }

  function handleDeletePayment(payment_id, tab_id){
    console.log(payment_id, tab_id, "payment_id, tab_id")
    setData(prevData => prevData.map((tab)=>{
      if(tab.id == tab_id){
        const newPaymentList =  tab.payments.filter((payment)=>{
          if(payment.id != payment_id){
            return payment
          }
        })
        return {...tab, payments: newPaymentList};
      }
      return tab;
    }));
  }

  const history = useHistory()

  function handleLogout(){
    fetch(`/logout`,{
      method: "DELETE",
    })
    .then((res)=>{
      if(res.ok){
          setCurrentUser(null)
      }
    })
  }

if(!currentUser) return <div className={"align-content-center"}><Login setCurrentUser={setCurrentUser}/></div>

  return (
    <>
    <div className=" align-content-center">
    <BrowserRouter>
      <button onClick={handleLogout}>Logout</button>
      <Switch>
        <Route exact path="/">
          <Tab tabList={data} handleTransitionLeft={handleTransitionLeft} 
          left={left} selectedTab={selectedTab} setSelectedTab={setSelectedTab} 
          handleClose={handleClose}/>
        </Route>
        <Route path="/payment/:id">
          <EditPayment selectedTab={selectedTab} handleUpdateTab=
          {handleUpdateTab} handleDeletePayment={handleDeletePayment}/>
        </Route>
        <Route path="/new_payment">
          <NewPayment selectedTab={selectedTab} handleUpdateTab=
          {handleUpdateTab} handleNewPayment={handleNewPayment}/>
        </Route>
        <Route path="/new_tab">
          <NewTab/>
        </Route>
        <Route path="/login">
          <Login setCurrentUser={setCurrentUser}/>
        </Route>
      </Switch>
      </BrowserRouter>

    </div>
    </>
  );
}

export default App;
