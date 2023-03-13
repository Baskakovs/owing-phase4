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
const [tabList, setTabList] = useState([])
const [selectedTab, setSelectedTab] = useState("")

useEffect(() => {
    fetch("/tabs")
    .then( res =>{
        if(res.ok){
            res.json().then(data => setTabList(data))
        }
    })

}, [])

useEffect(() => {
    tabList.filter((tabs)=>{
        if(tabs.id === selectedTab){
            setSelectedTab(tabs)
        }
    })
}, [selectedTab])

function handleTransitionLeft(id){
  setLeft(!left)
  setSelectedTab(id)
}

function handleClose(){
  setLeft(false)
}


// if(!currentUser) return <div className={"align-content-center"}><Login setCurrentUser={setCurrentUser}/></div>

  return (
    <>
    <div className=" align-content-center">
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Tab tabList={tabList} handleTransitionLeft={handleTransitionLeft} left={left} selectedTab={selectedTab} setSelectedTab={setSelectedTab} handleClose={handleClose}/>
        </Route>
        <Route path="/payment/:id">
          <EditPayment selectedTab={selectedTab}/>
        </Route>
      </Switch>
      </BrowserRouter>

    </div>
    </>
  );
}

export default App;
