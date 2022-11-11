import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/header.css';
import md5 from 'crypto-js/md5';

class Header extends Component {
  // async componentDidMount() {
  //   try {
  //     const { email } = this.props;
  //     const hashGravatar = md5(email).toString();
  //     const request = await fetch(`https://www.gravatar.com/avatar/${hashGravatar}?d=retro`);
  //     this.setState({ url: request.url });
  //     console.log(this.state);
  //   } catch (error) {
  //     console.log('opsss', error);
  //   }
  // }

  render() {
    const { name, score, email } = this.props;

    return (
      <header className="box_header">
        <img
          className="image_header"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          data-testid="header-profile-picture"
          alt="Imagem Gravatar"
        />
        <h3 className="player_header" data-testid="header-player-name">
          { name }
        </h3>
        <h3 className="player_header" data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  email: state.player.gravatarEmail,
  name: state.player.name,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
