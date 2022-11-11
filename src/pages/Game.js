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

  render() {
    const { selected, value } = this.state;
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
            {/* { const arrayQuest = [...q.incorrect_answers, q.correct_answer] } */}
            <p data-testid="question-category">{q.category}</p>
            <p data-testid="question-text">{q.question}</p>
            <div data-testid="answer-options">
              {[...q.incorrect_answers, q.correct_answer]
                .sort(() => Math.random() - value)
                .map((que, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={
                      que === q.correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
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
