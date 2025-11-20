//Importing dependencies
import React, {useState, useEffect, createContext} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
//Importing components
import './App.css';
import Login from './Components/Login';
import Tab from './Components/Tab';
import EditPayment from './Components/EditPayment';
import NewPayment from './Components/NewPayment';
import NewTab from './Components/NewTab';
import Nav from './Components/Nav';

//Setting up the context to be used in the code below
export const LoginContext = createContext()
export const TabContext = createContext()

function App() {

//USER AUTHENTIACTION AND LOGIN
//=============================
const [currentUser, setCurrentUser] = useState("")

useEffect(() => {
  fetch('/auth', {
    credentials: 'include'
  })
    .then(res => {
      if (res.ok) {
        res.json().then(user => setCurrentUser(user));
      }
    });
}, []);

//Handling Logout
function handleLogout(){
  fetch(`/logout`,{
    method: "DELETE",
    credentials: 'include'
  })
  .then((res)=>{
    if(res.ok){
        setCurrentUser(null)
    }
  })
}

//SET DATA FOR THE TAB.JS COMPONENT TAB LIST AND SELECTED TAB. ADDITIONALLY SET THE TRANSITION LEFT STATE TO TRUE ON THE TAB.JS COMPONENT
//=============================================================================

const [left, setLeft] = useState(false)
const [data, setData] = useState({})
const [selectedTab, setSelectedTab] = useState("")

//Fetching the data from the backend
useEffect(() => {
    fetch("/tabs", {
      credentials: 'include'
    })
    .then( res =>{
        if(res.ok){
            res.json().then(data => setData(data))
        }
    })

},[currentUser])

//When a tab is selected in TabList component, filter through all tabs to find the corrent one.
useEffect(() => {
  if(Array.isArray(data)){
    data.filter((tabs)=>{
      if(tabs.id === selectedTab || tabs.id === selectedTab.id){
        setSelectedTab(tabs)
      }
      return null
  })
  }
}, [data, selectedTab])

//Setting "left" state true or false to manipulate split screen display
function handleTransitionLeft(id){
  setLeft(!left)
  setSelectedTab(id)
}

function handleClose(){
  setLeft(false)
}

//UPDATING CRUD ACTIONS ON THE FRONT-END
//======================================

//Handling Tab update on the front-end
function handleUpdateTab(res){
  const newData = data.map((tab)=>{
    if(parseInt(tab.id) === parseInt(res.tab_id)){
      const newPayments = tab.payments.map((payment)=>{
        if(parseInt(payment.id) === parseInt(res.id)){
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
  //Handling Tab delete on the front-end
  function findNewPayer(res, tab){
    let newUser = tab.users.filter((user)=>{
      if(user.id === res.user_id){
        return user
      }
      return null
    })
    return newUser[0]
  }
  //Handling new Payment on the front-end
  function handleNewPayment(res){
    const newData = data.map((tab)=>{
      if(res.id === tab.id){
        return res 
      }else{
        return tab
      }
    })
    setData(newData)
  }

  //Hadling Payment delete on the front-end
  function handleDeletePayment(payment_id, tab_id){
    setData(data => data.map((tab)=>{
      if(tab.id === tab_id){
        const newPaymentList =  tab.payments.filter((payment)=>{
          if(payment.id !== payment_id){
            return payment
          }
          return null
        })
        return {...tab, payments: newPaymentList};
      }
      return tab;
    }));
  }

  //Handling new Tab on the front-end
  function handleNewTab(res){
    setData([...data, res])
  }

  if(!currentUser) return <div className={"align-content-center"}>
<LoginContext.Provider value={{setCurrentUser}}>
  <Login/>
</LoginContext.Provider>
</div>

  return (
    <>
    <div className="align-content-center">
    <BrowserRouter>
      <Nav handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={
          <TabContext.Provider value={{handleTransitionLeft, left, data, 
            handleClose, selectedTab, setSelectedTab}}>
            <Tab left={left}/>
          </TabContext.Provider>
        } />
        <Route path="/payment/:id" element={
          <EditPayment selectedTab={selectedTab} 
          handleUpdateTab={handleUpdateTab} 
          handleDeletePayment={handleDeletePayment}
          />
        } />
        <Route path="/new_payment" element={
          <NewPayment selectedTab={selectedTab} handleUpdateTab=
          {handleUpdateTab} handleNewPayment={handleNewPayment}/>
        } />
        <Route path="/new_tab" element={
          <NewTab handleNewTab={handleNewTab}/>
        } />
        <Route path="/login" element={
          <Login setCurrentUser={setCurrentUser}/>
        } />
      </Routes>
      </BrowserRouter>

    </div>
    </>
  );
}

export default App;
