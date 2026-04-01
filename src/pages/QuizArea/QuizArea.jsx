import { useContext } from "react";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import quizContext from "../../context/quizContext";
import Scoreboard from "../ScoreBoard/Scoreboard";

const QuizArea = () => {
  const { questions, next, score } = useContext(quizContext);

  if (!questions || questions.length === 0) {
    return <div style={{ color: "white" }}>Loading questions...</div>;
  }

  const len = questions.length;

  const randomNumber = () => Math.floor(Math.random() * 4);

  const getOptions = (incorrectAns, correctAns) => {
    let optionsArray = [...incorrectAns];

    if (!optionsArray.includes(correctAns)) {
      optionsArray.splice(randomNumber(), 0, correctAns);
    }

    return [optionsArray, correctAns];
  };

  return (
    <>
      {next <= len - 1 ? (
        <div className="container p-4">
          <QuestionBox
            key={next}
            category={questions[next].category}
            options={getOptions(
              questions[next].incorrect_answers,
              questions[next].correct_answer
            )}
            question={questions[next].question}
            len={len}
          />
        </div>
      ) : (
        <Scoreboard
          total_que={len}
          wrong_que={score.wrongAnswers}
          correct_que={score.rightAnswers}
        />
      )}
    </>
  );
};

export default QuizArea;