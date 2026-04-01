import React, { useContext } from "react";
import quizContext from "../../context/quizContext";
import { AiOutlineHome, AiOutlineEye } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Scoreboard = ({ total_que, correct_que, wrong_que }) => {
  const { setNext, setScore, setAnswerList } = useContext(quizContext);
  const navigate = useNavigate();

  /* 📊 CALCULATIONS */
  const percentage = ((correct_que / total_que) * 100) || 0;
  const attempted = ((correct_que + wrong_que) / total_que) * 100 || 0;

  /* 🔄 ACTIONS */
  const handleGoHome = () => {
    navigate("/"); // ✅ better than reload
  };

  const handlePlayAgain = () => {
    setNext(0);
    setScore({ rightAnswers: 0, wrongAnswers: 0 });
    setAnswerList([]);
    navigate("/");
  };

  /* 📦 STAT CARD */
  const StatCard = ({ label, value, color }) => (
    <Box
      flex="1"
      minW="120px"
      p={4}
      borderRadius="12px"
      bg="rgba(255,255,255,0.05)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255,255,255,0.1)"
      textAlign="center"
    >
      <Text fontSize="sm" color="gray.400">
        {label}
      </Text>
      <Text fontSize="xl" fontWeight="bold" color={color}>
        {value}
      </Text>
    </Box>
  );

  return (
    <MotionBox
      maxW="700px"
      mx="auto"
      mt={10}
      px={4}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 🏆 SCORE */}
      <Box textAlign="center" mb={8}>
        <Text fontSize="2xl" color="gray.400">
          Your Score
        </Text>
        <Text
          fontSize="5xl"
          fontWeight="bold"
          bgGradient="linear(to-r, green.300, teal.400)"
          bgClip="text"
        >
          {percentage.toFixed(2)}%
        </Text>
      </Box>

      {/* 📊 STATS */}
      <Flex gap={4} wrap="wrap" justify="center">
        <StatCard label="Attempted" value={`${attempted.toFixed(2)}%`} color="purple.300" />
        <StatCard label="Total" value={total_que} color="blue.300" />
        <StatCard label="Correct" value={correct_que} color="green.400" />
        <StatCard label="Wrong" value={wrong_que} color="red.400" />
      </Flex>

      {/* 🔘 ACTIONS */}
      <Flex justify="space-around" mt={10}>
        <ActionButton icon={<AiOutlineHome />} label="Home" onClick={handleGoHome} color="pink.400" />
        
        <ActionButton icon={<BsShare />} label="Share" color="purple.400" />
        
        <ReachLink to="/review">
          <ActionButton icon={<AiOutlineEye />} label="Review" color="orange.400" />
        </ReachLink>

        <ActionButton icon={<BiReset />} label="Play Again" onClick={handlePlayAgain} color="blue.400" />
      </Flex>
    </MotionBox>
  );
};

/* 🔘 BUTTON COMPONENT */
const ActionButton = ({ icon, label, onClick, color }) => (
  <MotionBox
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    textAlign="center"
    cursor="pointer"
  >
    <Flex
      align="center"
      justify="center"
      w="50px"
      h="50px"
      borderRadius="50%"
      bg={color}
      color="white"
      fontSize="20px"
      mb={1}
    >
      {icon}
    </Flex>
    <Text fontSize="sm" color="gray.300">
      {label}
    </Text>
  </MotionBox>
);

export default Scoreboard;