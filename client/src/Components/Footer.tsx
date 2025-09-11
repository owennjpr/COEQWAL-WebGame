import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

function Footer() {
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
        bottom: 0,
        right: 0,
        padding: "1rem",
        zIndex: "10",
      }}
      animate={{
        opacity: scroll > 0.05 ? 1 : 0,
        transition: { duration: 0.25 },
      }}
    >
      <div
        style={{
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
          cursor: "pointer",
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <p style={{ fontWeight: "lighter" }}>Back to Top</p>
      </div>
    </motion.div>
  );
}

export default Footer;
