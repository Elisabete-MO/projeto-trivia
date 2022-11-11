import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      // alternativas: [],
      selected: [],
      position: 0,
      value: 0.5,
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const { position } = this.state;

    const token = localStorage.getItem('token');
    const apiQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await apiQuestion.json();
    const quest = response;

    if (quest.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      return this.setState({
        // alternativas: quest.results,
        selected: [quest.results[position]],
      });
    }
  };

  showCorrectAnswer = () => {
    const wrongButtons = document.querySelectorAll('.wrong');
    const correctButton = document.querySelector('.correct');

    correctButton.style.border = '3px solid rgb(6, 240, 15)';
    wrongButtons.forEach((ele) => {
      ele.style.border = '3px solid red';
    });
  };

  render() {
    const { selected, value } = this.state;
    return (
      <main>
        <div className="container_game">
          <Header />
        </div>
        <h1>Trybe</h1>
        <h2>Score: 0</h2>
        {selected.map((q, i) => (
          <div key={ i }>
            <p data-testid="question-category">{q.category}</p>
            <p data-testid="question-text">{q.question}</p>
            <div data-testid="answer-options">
              {[...q.incorrect_answers, q.correct_answer]
                .sort(() => Math.random() - value)
                .map((que, index) => (
                  <button
                    key={ index }
                    type="button"
                    className={
                      que === q.correct_answer
                        ? 'correct'
                        : 'wrong'
                    }
                    data-testid={
                      que === q.correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
                    onClick={ this.showCorrectAnswer }
                  >
                    {que}
                  </button>))}
            </div>
          </div>
        ))}
      </main>
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
