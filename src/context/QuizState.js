import QuizContext from "./quizContext";
import { useState } from "react";

const QuizState = (props) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState({
    rightAnswers: 0,
    wrongAnswers: 0,
  });
  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answerList, setAnswerList] = useState([]);

  /* 🚀 FETCH QUESTIONS */
  const fetchQuestions = async (url) => {
    try {
      setLoading(true);

      // 🔥 prevent API spam
      await new Promise((res) => setTimeout(res, 800));

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("No questions found!");
      }

      setQuestions(data.results);
    } catch (error) {
      console.error("API ERROR:", error);
      alert("⚠️ API limit reached or invalid request. Try again!");

      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔄 RESET QUIZ */
  const resetQuiz = () => {
    setQuestions([]);
    setScore({ rightAnswers: 0, wrongAnswers: 0 });
    setNext(0);
    setAnswerList([]);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        score,
        setScore,
        next,
        setNext,
        loading,
        answerList,
        setAnswerList,
        fetchQuestions,
        resetQuiz,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizState;