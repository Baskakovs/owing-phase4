import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Tab from './Tab';
import NewPayment from './NewPayment';
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

if(!currentUser) return <div className={"align-content-center"}><Login setCurrentUser={setCurrentUser}/></div>

  return (
    <>
    <div className=" align-content-center">
      <Tab/>
    </div>
    </>
  );
}

export default App;
