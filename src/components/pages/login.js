import React, { Component } from 'react';


// our login page, this needs some work, as it does not currently connect
// with our backend
class Login extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentFeed: [
  //       { sender: 'Spencer', messages: 'thank you', recipient: 'Nick' },
  //     ],
  //     msg: '',
  //     points: 0,
  //     user: { name: 'Spencer', _id: 3 },
  //     rec: {},
  //     potRec: [
  //       { _id: 1, name: 'Nick' },
  //       { _id: 2, name: 'Emma' },
  //       { _id: 3, name: 'Sean' },
  //     ],
  //   };
  // }

  // componentDidMount() {
  //   fetch('/api')
  //     .then((res) => res.json())
  //     .then((potentialRec) => {
  //       this.setState({
  //         potRec: potentialRec,
  //       });
  //     })
  //     .catch((err) =>
  //       console.log('Error in get potentential reciepients: ', err)
  //     );
  //   fetch('/api/feed')
  //     .then((res) => res.json())
  //     .then((feed) => {
  //       this.setState({
  //         currentFeed: feed,
  //       });
  //     })
  //     .catch((err) => console.log('Error in get feed: ', err));
  // }

  submit(e) {
    // e.preventDefault();
    // fetch('/api/feed', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'Application/JSON',
    //   },
    //   body: JSON.stringify({
    //     sender: this.state.user.name,
    //     recipient_id: this.state.rec._id,
    //     points: this.state.points,
    //     messages: this.state.msg,
    //     sender_id: this.state.user._id,
    //     recipient: this.state.rec,
    //   }),
    // }).catch((err) => console.log('Error in get feed: ', err));
  }

  render() {
    return (
      <div className='Login'>
        <header className='App-header'></header>
        <center>
          <div className='header-login'>
            <h1>Login</h1>
            <hr />
            <br />
            <div className='login'>
              <form>
                <label> Username </label>
                <input type='text'></input> {/* must add get request*/}
                <br />
                <span>
                  <label> Password </label>
                  <input type='text'></input>
                </span>
              </form>
              <br />
              <div>
                <button name='submit' onClick={(e) => this.submit(e)}>
                  Submit
                </button>
              </div>
              <br />
              <span>
                <a href='/forgot'>Forgot account?</a>
                <br />
                <a href='/create'>Create account</a>
              </span>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Login;
