import React from 'react';

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
    const regex = /\S+@\S+\.\S+/;
    // const min = '1';
    const verifyEmail = regex.test(email);
    const verifyName = name.length > 0;
    const btnState = verifyEmail && verifyName;
    this.setState({ isBtnDisabled: !(btnState) });
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
        >
          Jogar
        </button>
      </main>
    );
  }
}

export default Login;
