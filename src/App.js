import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
