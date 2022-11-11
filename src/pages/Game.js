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
      alternativas: [],
      selected: [],
      position: 0,
      value: 0.5,
      isDisabled: false,
      timer: 0,
      intervalId: 0,
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const token = localStorage.getItem('token');
    const apiQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await apiQuestion.json();
    const quest = response;

    this.setState(({ alternativas: quest }), () => this.checkToken());
  };

  checkToken = () => {
    const { alternativas } = this.state;
    console.log(alternativas);
    if (alternativas.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.startTimeout();
      this.setSelectedQuestion();
    }
  };

  setSelectedQuestion = () => {
    const { value, alternativas, position } = this.state;
    const selected = [alternativas.results[position]];
    const answerArray = [...selected[0].incorrect_answers, selected[0].correct_answer]
      .sort(() => Math.random() - value);

    this.setState(({
      selected, answerArray,
    }));
  };

  startTimeout = () => {
    this.setState({ timer: 30 });

    const DELAY = 1000;
    const timeoutId = setInterval(() => {
      const { timer, intervalId } = this.state;
      this.setState({ timer: timer - 1 });

      if (timer === 1) {
        this.setState({ isDisabled: true });

        clearTimeout(intervalId);
      }
    }, DELAY);

    this.setState({ intervalId: timeoutId });
  };

  showCorrectAnswer = ({ target }) => {
    this.setScore(target);

    const correctButton = document.querySelector('.correct');
    correctButton.style.border = '3px solid rgb(6, 240, 15)';

    const wrongButtons = document.querySelectorAll('.wrong');

    wrongButtons.forEach((ele) => {
      ele.style.border = '3px solid red';
    });
  };

  setScore = (target) => {
    const { timeoutId, selected } = this.state;
    const { dispatch, oldScore, oldAssertions } = this.props;
    clearTimeout(timeoutId);
    let difficulty = 0;
    let assertions = 0;
    const selec = selected[0].difficulty;
    if (target.className === 'correct') {
      assertions = 1;
      if (selec === 'easy') {
        const num = 1;
        difficulty = num;
      } if (selec === 'medium') {
        const num = 2;
        difficulty = num;
      } if (selec === 'hard') {
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

  render() {
    const { selected, isDisabled, timer, answerArray } = this.state;
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
              {answerArray.map((que, index) => (
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
        <p id="counter">{timer}</p>
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
