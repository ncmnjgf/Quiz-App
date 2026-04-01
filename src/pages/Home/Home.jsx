import React, { useContext, useState } from "react";
import Form from "../../components/Form/Form";
import QuizArea from "../QuizArea/QuizArea";
import quizContext from "../../context/quizContext";
import { HashLoader } from "react-spinners";
import { Text, Flex, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const Home = () => {
  const { fetchQuestions, loading, questions } = useContext(quizContext);

  const [formData, setFormData] = useState({
    number: "",
    category: "any",
    difficulty: "any",
    type: "any",
  });

  /* ✅ BUILD CLEAN URL */
  const buildUrl = ({ number, category, difficulty, type }) => {
    let url = `https://opentdb.com/api.php?amount=${number}`;

    if (category !== "any") url += `&category=${category}`;
    if (difficulty !== "any") url += `&difficulty=${difficulty}`;
    if (type !== "any") url += `&type=${type}`;

    return url;
  };

  /* 🚀 SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.number || formData.number <= 0) {
      alert("Enter valid number of questions");
      return;
    }

    const apiUrl = buildUrl(formData);

    await fetchQuestions(apiUrl);
  };

  /* 🔄 INPUT */
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* 🔥 LOADER */}
      {loading && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          w="100%"
          h="100vh"
          bg="rgba(0,0,0,0.6)"
          backdropFilter="blur(6px)"
          justify="center"
          align="center"
          zIndex="999"
        >
          <HashLoader color="#22c55e" size={80} />
        </Flex>
      )}

      {/* 🎯 MAIN */}
      {questions.length === 0 ? (
        <MotionBox 
          maxW="700px" mx="auto" mt={10} px={4}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <MotionText
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            mb={2}
            textAlign="center"
            bgGradient="linear(to-r, green.300, teal.400)"
            bgClip="text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            Start Your Quiz 🚀
          </MotionText>
          <Text textAlign="center" color="gray.400" mb={8} fontSize="lg">
            Challenge yourself with premium trivia across various categories.
          </Text>

          <MotionBox
            p={8}
            borderRadius="24px"
            bg="rgba(255,255,255,0.03)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255,255,255,0.08)"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Form handleSubmit={handleSubmit} onChange={onChange} />
          </MotionBox>
        </MotionBox>
      ) : (
        <QuizArea />
      )}
    </>
  );
};

export default Home;