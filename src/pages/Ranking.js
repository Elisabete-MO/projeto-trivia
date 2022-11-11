import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Ranking extends React.Component {
  state = {
    redirectLogin: false,
  };

  render() {
    const { redirectLogin } = this.state;
    if (redirectLogin) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Page</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => { this.setState({ redirectLogin: true }); } }
        >
          Home
        </button>
      </div>
    );
  }
}

export default Ranking;
