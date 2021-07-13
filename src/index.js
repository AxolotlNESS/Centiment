import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// This is where the magic happens
// Simply has our router which lets us switch pages and our app
render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
)

// import React from 'react';
// import { render } from 'react-dom';
// import App from './components/App.jsx';

// import { BrowserRouter } from 'react-router-dom';

// render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
