import React, { Component } from 'react';
import Feed from '../Feed.jsx';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentFeed: [
        { sender: 'Spencer', messages: 'thank you', recipient: 'Nick' },
      ],
      msg: '',
      points: 0,
      user: { name: 'Sean', _id: 3 },
      potRec: [
        { _id: 1, name: 'Nick' },
        { _id: 2, name: 'Emma' },
        { _id: 3, name: 'Sean' },
      ],
      rec: { _id: 1, name: 'Nick' },
    };
  }

  componentDidMount() {
    fetch('/api')
      .then((res) => res.json())
      .then((potentialRec) => {
        this.setState({
          potRec: potentialRec,
        });
      })
      .catch((err) =>
        console.log('Error in get potentential reciepients: ', err)
      );
    fetch('/api/feed')
      .then((res) => res.json())
      .then((feed) => {
        this.setState({
          currentFeed: feed,
        });
      })
      .catch((err) => console.log('Error in get feed: ', err));
  }

  textChange(text) {
    this.setState({
      msg: text,
    });
    console.log(this.state.msg);
  }

  pointChange(int) {
    if (int === 'Select') {
      this.setState({
        points: 0,
      });
    } else
      this.setState({
        points: int,
      });
  }

  recipChange(recip) {
    let newRecip = this.state.potRec.filter((obj) => {
      return obj._id == recip;
    });
    console.log(newRecip);
    this.setState({
      rec: newRecip[0],
    });
  }

  submit(e) {
    console.log('current state.rec ' + this.state.rec._id);
    e.preventDefault();
    fetch('/api/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        sender: this.state.user.name,
        recipient_id: this.state.rec._id,
        points: this.state.points,
        messages: this.state.msg,
        sender_id: this.state.user._id,
      }),
    }).catch((err) => console.log('Error in get feed: ', err));
    let newFeedItem = {
      sender: this.state.user.name,
      messages: this.state.msg,
      recipient: this.state.rec.name,
    };
    let oldFeed = this.state.currentFeed;
    oldFeed.push(newFeedItem);
    this.setState({
      currentFeed: oldFeed,
    });
    fetch('/api/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        recipient_id: this.state.rec._id,
        points: this.state.points,
        sender_id: this.state.user._id,
      }),
    });
    this.setState({
      msg: '',
      points: 0,
    });
  }

  render() {
    const potRecc = [];
    this.state.potRec.forEach((el) => {
      potRecc.push(
        <option value={el._id} id={el._id}>
          {' '}
          {el.name}{' '}
        </option>
      );
    });
    return (
      <div className='Home'>
        <header className='App-header'></header>
        <div className='header'>
          <h1>Welcome to Centiment</h1>
        </div>
        <div className='feed'>
          <form className='form'>
            <label> Message</label>
            <input
              type='text'
              value={this.state.msg}
              onChange={(e) => this.textChange(e.target.value)}
            ></input>
            <label> Points </label>
            <select
              name='points'
              value={this.state.points}
              onChange={(e) => this.pointChange(e.target.value)}
            >
              <option value='Select'>Select</option>
              <option value='5'> 5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
            </select>
            <label> Recipients </label>
            <select
              name='Recipients'
              // value={this.state.rec.name}
              onChange={(e) => this.recipChange(e.target.value)}
            >
              {potRecc}
            </select>
            <button name='submit' onClick={(e) => this.submit(e)}>
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
