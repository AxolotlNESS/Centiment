import React, { Component } from "react";
import Feed from "../Feed.jsx";


class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentFeed: [
        { sender: "Spencer", messages: "thank you", recipient: "Nick" },
      ],
      msg: "",
      points: 0,
      user: {name: "Spencer", _id: 3},
      rec: {},
      potRec: [{"_id":1,"name":"Nick"},{"_id":2,"name":"Emma"},{"_id":3,"name":"Sean"}],
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
    fetch("/api/feed")
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
    fetch("/api/feed", {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        sender: this.state.user.name,
        recipient_id: this.state.rec._id,
        points: this.state.points,
        messages: this.state.msg, 
        // datetime_created: this.state.datetime_created,
        sender_id: this.state.user._id,
        recipient: this.state.rec,
      })
    })
      .then()
  }

  render() {
    const potRecc = [];
    this.state.potRec.forEach((el) => {
      potRecc.push(<option value={el.name} id={el._id}> {el.name} </option>);
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
