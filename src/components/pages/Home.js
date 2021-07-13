import React, { Component } from 'react';
import Feed from '../Feed.jsx';

// this is our home page, where the magic happens
class Home extends Component {
  constructor() {
    super();

    // some state data is hard coded in for testing purposes
    // this will all be updated on render pending a successful request
    // to our backend
    // only thing that is still hard coded in on render will be current 
    // user, since we do not have the sign in feature working yet
    this.state = {
      // feed items
      currentFeed: [
        { sender: 'Spencer', messages: 'thank you', recipient: 'Nick' },
      ],
      // current message being typed in input box
      msg: '',
      // current points selected to send
      points: 0,
      // user who is currently interacting with interface
      user: { name: 'Sean', _id: 3 },
      // potenetial reciepients. This is the drop down list of people
      // who you can send points to
      potRec: [
        { _id: 1, name: 'Nick' },
        { _id: 2, name: 'Emma' },
        { _id: 3, name: 'Sean' },
      ],
      // the currently selected reciepients, who points will be sent to
      // upon button click
      rec: { _id: 1, name: 'Nick' },
    };
  }

  // when component mounts
  componentDidMount() {
    // get potential receipients
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
    // get feed items
    fetch('/api/feed')
      .then((res) => res.json())
      .then((feed) => {
        this.setState({
          currentFeed: feed,
        });
      })
      .catch((err) => console.log('Error in get feed: ', err));
  }

  // when user types in message box update msg state property
  textChange(text) {
    this.setState({
      msg: text,
    });
    console.log(this.state.msg);
  }

  // when user selects new point total update state points attribute
  // (select is an option which can be selected)
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

  // update state when recipient is changed 
  recipChange(recip) {
    // since only user id is passed through we get the whole user object
    // (both user's name and id) by filtering from our potential recipients
    // state item
    let newRecip = this.state.potRec.filter((obj) => {
      return obj._id == recip;
    });
    console.log(newRecip);
    this.setState({
      rec: newRecip[0],
    });
  }

  // a lot happens when the user hits the submit button
  submit(e) {
    console.log('current state.rec ' + this.state.rec._id);
    // prevent page from reload
    e.preventDefault();
    // post request to feed (adds to database)
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
    // this chunk of code updates the state so that the new message 
    // renders immediately
    // there is certainly a better way to do this
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
    // this patch request updates the two users point totals in the database
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
    // reinitialize state data
    this.setState({
      msg: '',
      points: 0,
    });
  }

  render() {
    // create potential reciepients array
    const potRecc = [];
    // push each value from our state to it, passing down the id
    // along with it
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
