import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      alternativas: [],
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const apiQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await apiQuestion.json();
    const quest = response;
    // console.log(quest);

    if (quest.response_code !== 0) {
      localStorage.remove('token');
      history.push('/');
    } else {
      return this.setState({
        alternativas: quest.results,
      });
    }
  };

  render() {
    const { alternativas } = this.state;
    console.log(alternativas);
    return (
      <>
        <h1>Trybe</h1>
        <h2>Score: 0</h2>
        {alternativas.map((q, i) => (
          <div key={ i }>
            <p data-testid="question-category">{q.category}</p>
            <p data-testid="question-text">{q.question}</p>
            <div data-testid="answer-options">
              <button
                type="button"
                data-testid="correct-answer"
              >
                {q.correct_answer}
              </button>
              {q.incorrect_answers
                .map((que, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                  >
                    {que}
                  </button>))}
            </div>
          </div>
        ))}
      </>
    );
  }
}

Game.propTypes = {
//   dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Game);
