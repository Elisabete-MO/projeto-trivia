import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from '"prop-types';
// import { addEmailAction } from '../redux/actions';
import Header from '../components/Header';
import '../styles/game.css';

class Game extends Component {
  render() {
    return (
      <div className="container_game">
        <Header />
      </div>
    );
  }
}

export default Game;
