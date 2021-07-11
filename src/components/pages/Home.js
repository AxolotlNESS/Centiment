import React, { Component } from "react";
import Feed from "../Feed.jsx";


class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentFeed: [
        { sender: "Spencer", text: "thank you", recipient: "Nick" },
      ],
      msg: "",
      points: 0,
      user: {username: "Spencer", userID: 3},
      rec: "",
      potRec: [{username: "Emma", userID: 2}, {username: "Sean", userID: 4},{username: "Spencer", userID: 3}, {username: "Nick", userID: 1}],
    };
  }

  componentDidMount(){
    fetch("/api")
      .then(res => res.json())
      .then((potentialRec)=>{
        this.setState({
          potRec: potentialRec
        })
      })
      .catch(err => console.log('Error in get potentential reciepients: ', err))
    fetch("/FEEEEEED")
      .then(res => res.json())
      .then((feed)=>{
        this.setState({
          currentFeed: feed
        })
      })
      .catch(err => console.log('Error in get feed: ', err))
  }

  textChange(text) {
    this.setState({
      msg: text,
    });
    console.log(this.state.msg);
  }

  pointChange(int) {
    if (int === "Select") {
      this.setState({
        points: 0,
      });
    } else
      this.setState({
        points: int,
      });
  }

  recipChange(recip) {
    console.log(recip);
    this.setState({
      rec: recip,
    });
  }

  submit(e){
    e.preventDefault();
    fetch("/FEEEEEEEED", {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        message: this.state.msg, 
        points: this.state.points,
        userID: this.state.user.userID,
        userName: this.state.user.username
      })
    })
      .then()
  }

  render() {
    const potRecc = [];
    this.state.potRec.forEach((el) => {
      potRecc.push(<option value={el.username}> {el.username} </option>);
    });
    return (
      <div className="Home">
        <header className="App-header"></header>
        <div className="header">
          <h1>Welcome to Centiment</h1>
        </div>
        <div className="feed">
          <form>
            <label> Message</label>
            <input
              type="text"
              value={this.state.msg}
              onChange={(e) => this.textChange(e.target.value)}
            ></input>
            <label> Points </label>
            <select
              name="points"
              value={this.state.points}
              onChange={(e) => this.pointChange(e.target.value)}
            >
              <option value="Select">Select</option>
              <option value="5"> 5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <label> Recipients </label>
            <select
              name="Recipients"
              onChange={(e) => this.recipChange(e.target.value)}
            >
              {potRecc}
            </select>
            <button name="submit" onClick={(e) => this.submit(e)}>
              Submit
            </button>
          </form>
          <Feed feedItems={this.state.currentFeed}></Feed>
        </div>
      </div>
    );
  }
}

export default Home;
