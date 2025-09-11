import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

function NavBar() {
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
    <motion.div
      style={{
        position: "fixed",
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        zIndex: "10",
        pointerEvents: scroll > 0.05 && scroll < 0.9 ? "auto" : "none",
      }}
      animate={{
        opacity: scroll > 0.05 && scroll < 0.9 ? 1 : 0,
        transition: { duration: 0.25 },
      }}
    >
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          height: "4rem",
          backgroundColor: "#FFF8",
          borderRadius: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 0px 5px rgb(213,213,213)",
          backdropFilter: "blur(8px)",
        }}
      >
        NavBar {scroll}
      </div>
    </motion.div>
  );
}

export default NavBar;
