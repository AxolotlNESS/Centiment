import React, { Component } from "react";
import "./App.css";
import Feed from "./components/Feed.jsx";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentFeed: [
        { sender: "Spencer", text: "thank you", recipient: "Nick" },
      ],
      msg: "",
      points: 0,
      user: "",
      rec: "",
      potRec: ["Sean", "Emma", "Spencer", "Nick"],
    };
  }

  render() {
    const potRecc = [];
    this.state.potRec.forEach((el) => {
      potRecc.push(<option value={el}> {el} </option>);
    });
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className="header">
          <h1>Welcome to Centiment</h1>
          <form>
            <label> Message</label>
            <input type="text"></input>
            <label> Points </label>
            <select name="points">
              <option value="5"> 5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <label> Recipients </label>
            <select name="Recipients">
              {potRecc}
            </select>
            <button name="submit" onClick= "heli">
              Submit 
            </button>
          </form>
        </div>
        <div className="feed">
          <Feed feedItems={this.state.currentFeed}></Feed>
        </div>
      </div>
    );
  }
}

export default App;
