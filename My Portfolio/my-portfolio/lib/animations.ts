import { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const viewportConfig = { once: true, margin: "-80px" }
