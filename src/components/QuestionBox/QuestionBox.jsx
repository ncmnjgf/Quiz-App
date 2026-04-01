import React, { useContext, useEffect, useState } from "react";
import "./QuestionBox.css";
import { Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import quizContext from "../../context/quizContext";
import clickAudio from "./../../Assets/select-sound.mp3";

const audio = new Audio(clickAudio);

const QuestionBox = (props) => {
  const context = useContext(quizContext);
  const { setScore, score, next, setNext, answerList, setAnswerList } =
    context;

  const { question, options, category, len } = props;

  const [selectedAns, setSelectedAns] = useState("");
  const [timer, setTimer] = useState(30);

  const alphabet = ["A", "B", "C", "D"];

  // ✅ CHECK ANSWER
  const checkAnswer = () => {
    if (!selectedAns) return;

    if (selectedAns === options[1]) {
      setScore({
        ...score,
        rightAnswers: score.rightAnswers + 1,
      });
    } else {
      setScore({
        ...score,
        wrongAnswers: score.wrongAnswers + 1,
      });
    }
  };

  // ✅ NEXT QUESTION
  const handleNextQuestion = () => {
    checkAnswer();

    setAnswerList([
      ...answerList,
      {
        question,
        options: options[0],
        id: `id${next}`,
        category,
        myAnswer: selectedAns,
        rightAnswer: options[1],
      },
    ]);

    if (next < len) {
      setNext(next + 1);
      setSelectedAns("");
      setTimer(30); // reset timer
    }
  };

  // ✅ TIMER FIXED
  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  // ✅ OPTION CLICK
  const handleOptionClick = (opt) => {
    audio.currentTime = 0;
    audio.play();
    setSelectedAns(opt);
  };

  return (
    <div className="q-box mx-auto my-5 text-center fade-in">
      {/* HEADER */}
      <div className="q-box_head">
        <div className="q-box_timer">{timer}s</div>

        <div
          className="q-question"
          dangerouslySetInnerHTML={{ __html: question }}
        ></div>
      </div>

      {/* OPTIONS */}
      <div className="q-box_body">
        {options[0].map((opt, index) => {
          const letter = alphabet[index];
          const isSelected = selectedAns === opt;

          return (
            <motion.div
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={`q-box_options ${
                isSelected ? "optionSelected" : ""
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="option-icon">{letter}</div>

              <div
                dangerouslySetInnerHTML={{ __html: opt }}
              ></div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mx-3 mt-3">
        <Badge
          colorScheme="purple"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="0.8rem"
        >
          {category}
        </Badge>

        <motion.button
          onClick={handleNextQuestion}
          className="btn m-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {next >= len - 1 ? "Submit" : "Next"}
        </motion.button>
      </div>
    </div>
  );
};

export default QuestionBox;