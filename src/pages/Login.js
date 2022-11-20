import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getToken, playerLogin } from '../redux/actions/index';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isBtnDisabled: true,
      redirectToSettings: false,
    };
  }

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(getToken());
  // }

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
    const { dispatch } = this.props;

    dispatch(getToken());

    // const playerInfo = { name, email };
    // dispatch(playerLogin(playerInfo));
    // history.push('./game');
  };

  clickButtonSettings = () => {
    this.setState({ redirectToSettings: true });
  };

  render() {
    const { email, name, isBtnDisabled, redirectToSettings } = this.state;
    const { gettingToken, dispatch } = this.props;

    if (redirectToSettings) {
      return <Redirect to="/settings" />;
    }

    if (gettingToken) {
      const playerInfo = { name, email };
      dispatch(playerLogin(playerInfo));

      return <Redirect to="/game" />;
    }

    return (
      <main className="container_login">
        <div className="boxLogin">
          <input
            placeholder="Qual é o seu nome?"
            data-testid="input-player-name"
            name="name"
            type="text"
            onChange={ this.handleChange }
            value={ name }
          />
          <input
            placeholder="Qual é o seu e-mail do gravatar?"
            data-testid="input-gravatar-email"
            name="email"
            type="email"
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
          <button
            data-testid="btn-settings"
            type="submit"
            value="Settings"
            onClick={ this.clickButtonSettings }
          >
            Settings
          </button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  gettingToken: state.player.gettingToken,
});

Login.propTypes = {
  gettingToken: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
