import {
  Avatar,
  Box,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

const testimonials = [
  {
    name: "Dadaso",
    role: "Full Stack Developer",
    content:
      "This quiz web app allows users to select quiz criteria, answer questions, and track performance with a smooth and modern UI experience.",
  },
];

function TestimonialCard({ name, role, content }) {
  return (
    <MotionFlex
      direction={{ base: "column", md: "row" }}
      p={8}
      rounded="2xl"
      backdropFilter="blur(12px)"
      bg="rgba(255,255,255,0.05)"
      boxShadow="0 10px 40px rgba(0,0,0,0.4)"
      align="center"
      justify="space-between"
      gap={6}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* TEXT */}
      <Box textAlign="left">
        <chakra.p
          color="gray.300"
          fontSize="15px"
          lineHeight="1.6"
          mb={4}
        >
          {content}
        </chakra.p>

        <chakra.p fontWeight="bold" color="white">
          {name}
          <chakra.span color="gray.400" fontWeight="medium">
            {" "}
            - {role}
          </chakra.span>
        </chakra.p>
      </Box>

      {/* AVATAR */}
      <Avatar
        name={name}
        size="xl"
        bgGradient="linear(to-r, teal.400, green.400)"
      />
    </MotionFlex>
  );
}

export default function About() {
  return (
    <Flex
      direction="column"
      align="center"
      py={16}
      px={4}
      textAlign="center"
    >
      {/* HEADER */}
      <MotionBox
        maxW="700px"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <chakra.h3
          textTransform="uppercase"
          fontSize="sm"
          letterSpacing="2px"
          color="teal.300"
          mb={2}
        >
          About Project
        </chakra.h3>

        <chakra.h1
          fontSize={{ base: "32px", md: "48px" }}
          fontWeight="bold"
          bgGradient="linear(to-r, teal.300, green.400)"
          bgClip="text"
        >
          Quiz Web App
        </chakra.h1>

        <chakra.p
          mt={4}
          color={useColorModeValue("gray.400", "gray.300")}
          fontSize="16px"
        >
          Test your knowledge with an interactive and beautifully designed quiz experience.
        </chakra.p>
      </MotionBox>

      {/* CARD */}
      <SimpleGrid columns={1} spacing={10} mt={12} maxW="800px">
        {testimonials.map((item, index) => (
          <TestimonialCard key={index} {...item} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}