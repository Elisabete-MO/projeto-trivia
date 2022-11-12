import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      minAssertions: 3,
      redirectToLogin: false,
      redirectToRanking: false,
    };
  }

  render() {
    const { minAssertions, redirectToRanking, redirectToLogin } = this.state;
    const { assertions, score } = this.props;

    if (redirectToLogin) {
      return <Redirect to="/" />;
    }

    if (redirectToRanking) {
      return <Redirect to="/ranking" />;
    }

    return (
      <main>
        <Header />
        <div>
          {/* Requisito 13 */}
          <p data-testid="feedback-text">
            {
              assertions >= minAssertions
                ? 'Well Done!'
                : 'Could be better...'
            }
          </p>
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          {/* Requisito 15 */}
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => { this.setState({ redirectToLogin: true }); } }
          >
            Play Again
          </button>
          {/* Requisito 16 */}
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => { this.setState({ redirectToRanking: true }); } }
          >
            Ranking
          </button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  assertions: player.assertions,
  score: player.score,
  // profileImage: (imagem do gravatar)
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // name: PropTypes.string.isRequired,
  // profileImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
