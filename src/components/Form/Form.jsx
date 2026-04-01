import React from "react";
import { motion } from "framer-motion";
import quizData from "../../components/TriviaQuizData";
import "./Form.css";

const Form = (props) => {
  const { handleSubmit, onChange } = props;

  const getOptionsValue = (data) => {
    return data.map((item) => {
      const key = Object.keys(item)[0];
      return (
        <option key={key} value={item[key]}>
          {key}
        </option>
      );
    });
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="quiz-form">
        
        {/* TITLE */}
        <h2 className="form-title">Start Your Quiz 🚀</h2>

        {/* NUMBER */}
        <div className="form-group">
          <input
            type="number"
            name="number"
            required
            onChange={onChange}
            placeholder=" "
          />
          <label>Number of Questions</label>
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <select name="category" onChange={onChange}>
            <option value="any">Any Category</option>
            {getOptionsValue(quizData.category)}
          </select>
          <label>Select Category</label>
        </div>

        {/* DIFFICULTY */}
        <div className="form-group">
          <select name="difficulty" onChange={onChange}>
            <option value="any">Any Difficulty</option>
            {getOptionsValue(quizData.difficulty)}
          </select>
          <label>Select Difficulty</label>
        </div>

        {/* TYPE */}
        <div className="form-group">
          <select name="type" onChange={onChange}>
            <option value="any">Any Type</option>
            {getOptionsValue(quizData.type)}
          </select>
          <label>Select Type</label>
        </div>

        {/* BUTTON */}
        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Quiz →
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Form;