import React, { Component } from "react";
import "./App.css";
import Feed from "./components/Feed.jsx";
import Navbar from  "./components/Navbar.jsx";
import Routes from  "./components/Routes.jsx";

class App extends Component {
  render(){
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }

}

export default App;
