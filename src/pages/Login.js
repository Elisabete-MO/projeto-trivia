import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken, playerLogin } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isBtnDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(({ [name]: value }), () => this.verifyBtn());
  };

  verifyBtn = () => {
    const { email, name } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/g;
    const verifyEmail = regex.test(email);
    const verifyName = name.length > 0;
    const btnState = verifyEmail && verifyName;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { name, email } = this.state;

    const playerInfo = { name, email };
    dispatch(getToken());
    dispatch(playerLogin(playerInfo));
    history.push('./game');
  };

  render() {
    const { email, name, isBtnDisabled } = this.state;
    return (
      <main>
        <input
          placeholder="Qual é o seu nome?"
          data-testid="input-player-name"
          name="name"
          onChange={ this.handleChange }
          value={ name }
        />
        <input
          placeholder="Qual é o seu e-mail do gravatar?"
          data-testid="input-gravatar-email"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isBtnDisabled }
          onClick={ this.handleSubmit }
        >
          Jogar
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
