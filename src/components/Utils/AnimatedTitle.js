import { motion } from "framer-motion";

export const AnimatedTitle = ({ children }) => {
  return (
    <motion.h1
      initial={{
        opacity: 0.5,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.6,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      style={{
        position: "relative",
      }}
    >
      {children}
    </motion.h1>
  );
};