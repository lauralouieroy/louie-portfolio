import { motion } from "framer-motion";

export const ScrollReveal = ({
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.1,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};
