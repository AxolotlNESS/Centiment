import React, { Component } from 'react';

class Create extends Component {
  render() {
    return (
      <div class='container'>
        <div>
          <form>
            <label>Username</label>
            <input type='username' id='usr' name ='usr'>

            </input>
            <br />
            <label>
              Password
            </label>
            <input
              type='password'
              id='psw'
              name='psw'
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
            >
            </input>
            <br />
            <input type='submit' value='Submit'></input>
          </form>
        </div>

        <div id='message'>
          <h3>Password must contain the following:</h3>
          <p id='letter' class='invalid'>
            A <b>lowercase</b> letter
          </p>
          <p id='capital' class='invalid'>
            A <b>capital (uppercase)</b> letter
          </p>
          <p id='number' class='invalid'>
            A <b>number</b>
          </p>
          <p id='length' class='invalid'>
            Minimum <b>8 characters</b>
          </p>
        </div>
      </div>
    );
  }
}

export default Create;
