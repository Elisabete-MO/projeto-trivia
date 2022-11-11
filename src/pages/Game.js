import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playerScore } from '../redux/actions';
import '../styles/game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      // alternativas: [],
      selected: [],
      position: 0,
      value: 0.5,
      timeoutId: 0,
      isDisabled: false,
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
      const delay = 1000;
      const timeout = setInterval(this.countDowm, delay);
      return this.setState(({
        // alternativas: quest.results,
        selected: [quest.results[position]],
        timeoutId: timeout,
      }));
    }
  };

  setScore = (target) => {
    const { timeoutId, selected } = this.state;
    const { dispatch, oldScore, oldAssertions } = this.props;
    clearTimeout(timeoutId);
    let difficulty = 0;
    let assertions = 0;
    if (target.className === 'correct') {
      assertions = 1;
      if (selected[0].difficulty === 'easy') {
        const num = 1;
        difficulty = num;
      } if (selected[0].difficulty === 'medium') {
        const num = 2;
        difficulty = num;
      } if (selected[0].difficulty === 'hard') {
        const num = 3;
        difficulty = num;
      }
    }

    const timer = document.getElementById('counter').innerHTML;
    const ten = 10;
    const score = (ten + Number(timer) * difficulty);
    const total = {
      score: score + oldScore,
      assertions: assertions + oldAssertions,
    };
    if (target.className === 'correct') {
      dispatch(playerScore(total));
    }
  };

  showCorrectAnswer = ({ target }) => {
    this.setScore(target);
    const wrongButtons = document.querySelectorAll('.wrong');
    const correctButton = document.querySelector('.correct');

    correctButton.style.border = '3px solid rgb(6, 240, 15)';
    wrongButtons.forEach((ele) => {
      ele.style.border = '3px solid red';
    });
  };

  countDowm = () => {
    const { timeoutId } = this.state;

    const timerElement = document.getElementById('counter');
    // console.log(timerElement.innerHTML);
    if (Number(timerElement.innerHTML) === 0) {
      clearTimeout(timeoutId);
      this.setState({ isDisabled: true });
    } else {
      timerElement.innerHTML -= 1;
    }
  };

  render() {
    const { selected, value, isDisabled } = this.state;
    console.log(selected);
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
                    disabled={ isDisabled }
                  >
                    {que}
                  </button>))}
            </div>
          </div>
        ))}
        <p id="counter">30</p>
      </main>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  oldScore: player.score,
  oldAssertions: player.assertions,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  oldScore: PropTypes.number.isRequired,
  oldAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
