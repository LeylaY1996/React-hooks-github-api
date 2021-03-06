import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { ListRepo } from './router';
import ListUsers from './components/ListUsers';
import {Redirect} from 'react-router-dom';
import ListBookmarks from './components/ListBookmarks';
import RepoDetail from './components/RepoDetail';

const Routing = () => {
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/list-repo" component={ListRepo} />
        <Route path="/repo-detail/:id" component={RepoDetail} />
        <Route path="/list-users" component={ListUsers} />
        <Route path="/list-bookmarks" component={ListBookmarks} />
      </Switch>
    </Router>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
