import React from "react";

interface DescriptionProps {
  setTutorialActive: () => void;
}

function Description(props: DescriptionProps) {
  const { setTutorialActive } = props;

  const tutorialClick = () => {
    const targetElement = document.getElementById("simulation");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      window.scrollTo({ top: maxScroll, behavior: "smooth" });
    }

    // setTutorialActive();
    setTimeout(() => setTutorialActive(), 500);
  };

  return (
    <div
      id="description"
      style={{ width: "100%", minHeight: "100vh", height: "fit-content" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          padding: "2rem",
          boxSizing: "border-box",
          gridTemplateRows: "auto auto auto",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <img
            src="shasta-dam-reservoir.jpg"
            alt="the shasta dam"
            width={"35%"}
            style={{
              borderRadius: "2rem",
              boxShadow: "0px 0px 5px rgb(180,180,180)",
            }}
          />
          <div style={{}}>
            <p style={{ fontSize: "1.9vw", fontWeight: "lighter" }}>
              The California water system is a vast, interconnected network of
              rivers, reservoirs, aqueducts, dams, canals, and pumps that moves
              water across the state—from mountains and rivers to communities,
              farms, and ecosystems. It is one of the most complex water systems
              in the world.
            </p>
            <p style={{ fontSize: "1.9vw", fontWeight: "lighter" }}>
              This complexity, and the lack of transparency surrounding water
              managment decision-making, makes it difficult to know what kind of
              choices can be made about how water is managed throughout the
              state. The intent of this dashboard is to provide a simplified
              birds eye view of different water management approaches,
              visualizing them through 600 potential scenarios.
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "1.9vw", fontWeight: "lighter" }}>
              This project was created by{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://owennjpr.github.io/portfolio/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Owen Prendergast
              </a>{" "}
              in collaboration with UC Berkeley's{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://live-coeqwal-ca.pantheon.berkeley.edu/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Collaboratory for Equity in Water Allocation (COEQWAL)
              </a>
              . COEQWAL is a collaborative project focused on exploring
              alternative water management decisions and supporting more
              equitable and inclusive stewardship of California's water system.
            </p>
            <p style={{ fontSize: "1.9vw", fontWeight: "lighter" }}>
              This dashboard uses data from{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://water.ca.gov/Library/Modeling-and-Analysis/Central-Valley-models-and-tools/CalLite"
                target="_blank"
                rel="noreferrer noopener"
              >
                CalLite
              </a>
              , a simplified version of{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://water.ca.gov/Library/Modeling-and-Analysis/Central-Valley-models-and-tools/CalSim-3"
                target="_blank"
                rel="noreferrer noopener"
              >
                CalSim
              </a>{" "}
              which is used to model and predict the flow of water through
              California. This site aggregates data from 600 CalLite scenarios
              to create an interactive way to learn more about the challenges of
              water management in California.
            </p>
          </div>
          <img
            src="delta_img.png"
            alt="the shasta dam"
            width={"35%"}
            style={{
              borderRadius: "2rem",
              boxShadow: "0px 0px 5px rgb(180,180,180)",
            }}
          />
        </div>
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
          <button
            onClick={tutorialClick}
            className="buttonTransparent"
            style={{}}
          >
            <p
              style={{
                fontSize: "1.9vw",
                lineHeight: "0px",
                paddingLeft: "1rem",
                paddingRight: "1rem",

                fontWeight: "lighter",
              }}
            >
              Start Tutorial
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Description;
