import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// import PropTypes from 'prop-types';

const countRank = 5;

class Ranking extends React.Component {
  state = {
    redirectLogin: false,
  };

  getRankings() {
    const rankingInfo = JSON.parse(localStorage.getItem('ranking'));
    return rankingInfo || [];
    // ranking: [
    //    { name: nome_da_pessoa, score: 10, picture: url_da_foto_no_gravatar }
    //  ]
  }

  render() {
    const { redirectLogin } = this.state;
    if (redirectLogin) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking Page</h1>
        <ol>
          {
            this.getRankings().map((player, index) => index < countRank && (
              <li key={ index }>
                <img
                  alt="Gravatar"
                  src={ player.picture }
                />
                <p data-testid={ `player-name-${index}` }>
                  {player.name}
                </p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </li>
            ))
          }
        </ol>
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
