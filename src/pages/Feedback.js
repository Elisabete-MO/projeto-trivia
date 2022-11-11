import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
    const { name, assertions, score } = this.props;

    if (redirectToRanking) {
      return <Redirect to="/ranking" />;
    }

    return (
      <main>
        <div>
          {/* Requisito 12 -> (Talvez possa ser usado o componente header caso criado no Requisito 5) */}
          {/* <img src={profileImage} alt="Profile picture" data-testid="header-profile-picture"/> */}
          <h3 data-testid="header-player-name">{ name }</h3>
          <p data-testid="header-score">{ score }</p>
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
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  // profileImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
