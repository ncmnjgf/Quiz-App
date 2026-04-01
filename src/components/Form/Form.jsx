import React, { useState } from "react";
import { motion } from "framer-motion";
import quizData from "../../components/TriviaQuizData";
import "./Form.css";

/* 🔥 ANIMATION VARIANTS */
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const Form = ({ handleSubmit, onChange }) => {
  const [formData, setFormData] = useState({
    number: "",
    category: "any",
    difficulty: "any",
    type: "any",
  });

  /* 🔁 OPTIONS GENERATOR */
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

  /* 🔄 HANDLE CHANGE */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    onChange(e);
  };

  /* ✅ VALIDATION */
  const isValid = formData.number > 0 && formData.number <= 50;

  return (
    <motion.div
      className="form-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="quiz-form"
        variants={containerVariants}
      >
        {/* TITLE */}
        <motion.h2 className="form-title" variants={itemVariants}>
          Start Your Quiz 🚀
        </motion.h2>

        {/* NUMBER */}
        <motion.div className="form-group" variants={itemVariants}>
          <input
            type="number"
            name="number"
            min="1"
            max="50"
            required
            value={formData.number}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Number of Questions (1–50)</label>
        </motion.div>

        {/* CATEGORY */}
        <motion.div className="form-group" variants={itemVariants}>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="any">Any Category</option>
            {getOptionsValue(quizData.category)}
          </select>

        </motion.div>

        {/* DIFFICULTY */}
        <motion.div className="form-group" variants={itemVariants}>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="any">Any Difficulty</option>
            {getOptionsValue(quizData.difficulty)}
          </select>

        </motion.div>

        {/* TYPE */}
        <motion.div className="form-group" variants={itemVariants}>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="any">Any Type</option>
            {getOptionsValue(quizData.type)}
          </select>

        </motion.div>

        {/* BUTTON */}
        <motion.button
          type="submit"
          className="submit-btn"
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
        >
          {isValid ? "Start Quiz →" : "Enter valid number"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Form;