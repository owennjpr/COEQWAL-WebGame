import { useState } from "react";
import Footer from "./Components/Footer";
import GradientBG from "./Components/GradientBG";
import NavBar from "./Components/NavBar";
import TutorialPopUp from "./Components/TutorialPopUp";
import Description from "./Pages/Description";
import Landing from "./Pages/Landing";
import Sim from "./Pages/Sim";

const App = () => {
  const [tutorialActive, setTutorialActive] = useState<boolean>(false);
  return (
    <div>
      <GradientBG />
      {/* <NavBar /> */}
      <Landing />
      <Description
        setTutorialActive={() => {
          setTutorialActive(true);
        }}
      />
      <TutorialPopUp active={tutorialActive} setActive={setTutorialActive} />
      <Sim />
      <Footer />
    </div>
  );
};

export default App;
