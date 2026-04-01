import React, { useContext } from "react";
import quizContext from "../../context/quizContext";
import ReviewAnswerBox from "../../components/ReviewAnswerBox/ReviewAnswerBox";
import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ReviewAnswer = () => {
  const { answerList } = useContext(quizContext);

  /* ❌ EMPTY STATE */
  if (!answerList || answerList.length === 0) {
    return (
      <Flex justify="center" align="center" h="60vh">
        <Text fontSize="2xl" color="gray.400">
          No answers to review 😅
        </Text>
      </Flex>
    );
  }

  return (
    <MotionBox
      maxW="900px"
      mx="auto"
      mt={10}
      px={4}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 🔥 HEADER */}
      <Text
        fontSize="4xl"
        fontWeight="bold"
        mb={6}
        bgGradient="linear(to-r, green.300, teal.400)"
        bgClip="text"
        textAlign="center"
      >
        Review Your Answers 📊
      </Text>

      {/* 📦 ANSWERS */}
      <Box
        p={6}
        borderRadius="16px"
        bg="rgba(255,255,255,0.03)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255,255,255,0.1)"
      >
        {answerList.map((item, index) => {
          const { question, options, category, myAnswer, rightAnswer } = item;

          return (
            <MotionBox
              key={index} // ✅ FIXED
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ReviewAnswerBox
                myAnswer={myAnswer}
                rightAnswer={rightAnswer}
                question={question}
                options={options}
                category={category}
                num={index + 1} // ✅ FIXED
              />
            </MotionBox>
          );
        })}
      </Box>
    </MotionBox>
  );
};

export default ReviewAnswer;