import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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

  handleChange = ({ target: { name, value } }) => {
    this.setState(({ [name]: value }), () => this.verifyBtn());
  };

  verifyBtn = () => {
    const { email, name } = this.state;
    const regex = /\S+@\S+\.\S+/;
    // const min = '1';
    const verifyEmail = regex.test(email);
    const verifyName = name.length > 0;
    const btnState = verifyEmail && verifyName;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  clickButtonSettings = () => {
    this.setState({ redirectToSettings: true });
  };

  render() {
    const { email, name, isBtnDisabled, redirectToSettings } = this.state;

    if (redirectToSettings) {
      return <Redirect to="/settings" />;
    }

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
        >
          Jogar
        </button>
        <input
          data-testid="btn-settings"
          type="submit"
          value="Settings"
          onClick={ this.clickButtonSettings }
        />
      </main>
    );
  }
}

export default Login;
