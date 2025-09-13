import React from "react";
import { motion } from "motion/react";

function Landing() {
  const caretClick = () => {
    const targetElement = document.getElementById("description");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScroll / 2, behavior: "smooth" });
    }
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: "8vw",
            fontWeight: 10,
            letterSpacing: "0.15em",
            margin: "0px",
            textAlign: "center",
          }}
        >
          <span style={{ color: "black" }}>Cal</span>
          <span style={{ color: "black" }}>Vis</span>
        </p>
        <p
          style={{
            fontSize: "3vw",
            fontWeight: "lighter",
            margin: "0px",
            textAlign: "center",
          }}
        >
          A California Water Managment Dashboard
        </p>
        <div
          style={{
            width: "3vw",
            height: "3vw",
            cursor: "pointer",
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1rem",
          }}
          onClick={caretClick}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="3vw"
            height="3vw"
            fill="currentColor"
            className="bi bi-caret-down"
            viewBox="0 0 16 16"
            animate={{ paddingTop: 0, transition: { duration: 0.1 } }}
            whileHover={{ paddingTop: "1rem" }}
          >
            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
          </motion.svg>
        </div>
      </div>
    </div>
  );
}

export default Landing;
