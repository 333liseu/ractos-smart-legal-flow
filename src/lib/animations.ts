import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
