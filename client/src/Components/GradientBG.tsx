import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

function GradientBG() {
  const [scroll, setScroll] = useState<number>(0);
  useEffect(() => {
    const scrolled = () => {
      setScroll(window.scrollY / maxScroll);
    };
    window.addEventListener("scroll", scrolled);

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    return () => {
      window.removeEventListener("scroll", scrolled);
    };
  }, []);

  return (
    <div
      className="corebg"
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: "-50",
        opacity: 1 - scroll * 0.6,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "-15vw",
          left: "-15vw",
          width: "60vw",
          height: "60vw",
          background: "white",
          borderRadius: "100%",
          opacity: 0,
        }}
        animate={{
          opacity: scroll > 0.3 && scroll < 0.7 ? 0.35 : 0,
          transition: { duration: 1 },
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "-15vw",
          right: "-15vw",
          width: "70vw",
          height: "70vw",
          background: "white",
          borderRadius: "100%",
          opacity: 0,
        }}
        animate={{
          opacity: scroll > 0.3 && scroll < 0.7 ? 0.35 : 0,
          transition: { duration: 1 },
        }}
      />
    </div>
  );
}

export default GradientBG;
