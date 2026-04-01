import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
import { Link as ReachLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import quizContext from "../../context/quizContext";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "./../../Assets/logo.png";

const MotionBox = motion(Box);

export default function BetterNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { resetQuiz } = useContext(quizContext);

  const NavItem = ({ to, icon, children, onClick }) => {
    const isActive = location.pathname === to;

    return (
      <ReachLink to={to} onClick={onClick}>
        <HStack
          px={4}
          py={2}
          rounded="lg"
          spacing={2}
          cursor="pointer"
          position="relative"
          transition="all 0.3s ease"
          bg={isActive ? "rgba(255,255,255,0.1)" : "transparent"}
          _hover={{
            bg: "rgba(255,255,255,0.08)",
            transform: "translateY(-2px)",
          }}
        >
          {icon}
          <Text fontWeight="semibold">{children}</Text>

          {isActive && (
            <MotionBox
              layoutId="active-pill"
              position="absolute"
              inset="0"
              bg="rgba(255,255,255,0.08)"
              rounded="lg"
              zIndex={-1}
            />
          )}
        </HStack>
      </ReachLink>
    );
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      backdropFilter="blur(12px)"
      bg="rgba(33, 40, 50, 0.7)"
      borderBottom="1px solid rgba(255,255,255,0.08)"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        px={6}
        maxW="1200px"
        mx="auto"
      >
        {/* LEFT */}
        <HStack spacing={4} cursor="pointer" onClick={resetQuiz}>
          <ReachLink to="/">
            <MotionBox whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Avatar size="sm" src={logo} />
            </MotionBox>
          </ReachLink>

          <Text
            fontWeight="bold"
            fontSize="lg"
            bgGradient="linear(to-r, teal.300, green.400)"
            bgClip="text"
          >
            QuizApp
          </Text>
        </HStack>

        {/* DESKTOP MENU */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <NavItem to="/" icon={<FaHome />} onClick={resetQuiz}>
            Home
          </NavItem>
          <NavItem to="/about" icon={<InfoIcon />}>
            About
          </NavItem>
        </HStack>

        {/* MOBILE BUTTON */}
        <IconButton
          size="md"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          _hover={{ bg: "whiteAlpha.200" }}
        />
      </Flex>

      {/* MOBILE MENU */}
      {isOpen && (
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box px={6} pb={4} display={{ md: "none" }}>
            <Stack spacing={3}>
              <NavItem to="/" icon={<FaHome />} onClick={() => { resetQuiz(); onClose(); }}>
                Home
              </NavItem>
              <NavItem to="/about" icon={<InfoIcon />} onClick={onClose}>
                About
              </NavItem>
            </Stack>
          </Box>
        </MotionBox>
      )}
    </Box>
  );
}