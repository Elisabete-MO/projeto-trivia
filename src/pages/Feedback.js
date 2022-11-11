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
      redirectToRanking: false,
    };
  }

  render() {
    const { minAssertions, redirectToRanking } = this.state;
    const { assertions, score, history } = this.props;

    if (redirectToRanking) {
      return <Redirect to="/ranking" />;
    }

    return (
      <main>
        <div>
          <Header />
        </div>

        <div>
          {/* Requisito 13 */}
          <p data-testid="feedback-text">
            {
              assertions >= minAssertions
                ? 'Well Done!'
                : 'Could be better...'
            }
          </p>

          {/* Requisito 14 */}
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          {/* Requisito 18 */}
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => { this.setState({ redirectToRanking: true }); } }
          >
            Go to Ranking
          </button>
          {/* Requisito 15 */}
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => { history.push('/'); } }
          >
            Play Again
          </button>
          {/* Requisito 16 */}
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => { history.push('/ranking'); } }
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
