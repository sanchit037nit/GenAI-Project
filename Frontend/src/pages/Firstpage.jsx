import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";

const MovingText = () => {
  const text =
    "💼 DSA Roadmaps • 🤖 AI Mock Interviews • 📅 Study Planner • 🎯 Company-wise Preparation • ";

  return (
    <div className="overflow-hidden w-full py-2 bg-gray-800/60">
      <motion.div
        className="inline-block whitespace-nowrap text-white font-semibold text-xl"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 400,
          ease: "linear",
        }}
      >
        {Array(5).fill(text + "          ").join("")}
      </motion.div>
    </div>
  );
};

// ===== Animated Central Text =====
const AnimatedText = ({ text }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 },
    },
  };

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.h1
      className="text-6xl sm:text-5xl font-extrabold tracking-wider mb-6 flex gap-2 flex-wrap justify-center text-white"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          whileHover={{ scale: 1.3, rotate: [0, 5, -5, 0] }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// ===== Landing Page =====
export const Firstpage = () => {
  const { authUser } = useAuthStore();

  const handleClick = () => {
    if (!authUser) {
      toast.error("⚠️ Login required to create your interview plan!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    window.location.href = "/planner"; // Change if needed
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-800">

      {/* Floating Icons */}
      <motion.div
        className="absolute top-10 left-5 text-5xl opacity-70"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🤖
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-5xl opacity-60"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        💼
      </motion.div>

      {/* Marquee */}
      <MovingText />

      {/* Main */}
      <motion.div className="relative z-10 flex flex-col grow justify-center items-center text-center py-16 px-6 text-white">

        <AnimatedText text="🤖 AI INTERVIEW GUIDE" />

        <motion.p
          className="text-xl sm:text-lg max-w-3xl mb-8 opacity-90"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Ace your dream job with an AI-powered interview mentor.
          Build personalized preparation roadmaps, generate company-specific
          study plans, practice technical & HR interviews, track your progress,
          and stay interview-ready every day.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-full bg-emerald-500 text-black font-semibold hover:shadow-lg"
            onClick={handleClick}
          >
            🚀 Start Planning
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-full bg-blue-600 text-white font-semibold hover:shadow-lg"
            onClick={() => (window.location.href = "/signup")}
          >
            ✨ Get Started
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};