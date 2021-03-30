import logo from "./logo.svg";
import {
  Experiment,
  Variant,
  emitter,
  experimentDebugger,
} from "@marvelapp/react-ab-test";
import Mixpanel from "mixpanel";
import "./App.css";

experimentDebugger.enable();
emitter.defineVariants(
  "landingPageExperiments",
  ["version1", "version2", "version3"],
  [34, 33, 33]
);
var mixpanel = Mixpanel.init("a40caa643cee0cc132b7d1c36b2fb756");
function App() {
  function buttonClick(e) {
    emitter.emitWin("landingPageExperiments");
  }
  emitter.addPlayListener(function (expName, VarName) {
    console.log(`Displaying Experient ${expName} with Varient ${VarName}`);
  });
  emitter.addWinListener(function (experimentName, varientsName) {
    console.log(`Version: ${varientsName} and Experiment: ${experimentName}`);
    mixpanel.track(experimentName, {
      name: varientsName,
      experiment: experimentName,
    });
  });

  return (
    <div className="App">
      <header>A-B Test with React</header>
      <div className="description">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source.
      </div>
      <Experiment name="landingPageExperiments">
        <Variant name="version1">
          <button onClick={buttonClick} className="btn">
            Learn More
          </button>
        </Variant>
        <Variant name="version2">
          <button onClick={buttonClick} className="btn2">
            Learn More
          </button>
        </Variant>
        <Variant name="version3">
          <button onClick={buttonClick} className="btn3">
            Learn More
          </button>
        </Variant>
      </Experiment>
    </div>
  );
}

export default App;
