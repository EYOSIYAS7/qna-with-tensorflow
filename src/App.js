import React, { useEffect, useState, useRef } from "react";
import "./App.css";

import * as ts from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import "react-loader-spinner/dist/loader/Circles";
import Loader from "react-loader-spinner";
import { Fragment } from "react";

const App = () => {
  const [model, setModel] = useState(null);
  const [answer, setAnswer] = useState();

  const Passage = useRef();
  const Question = useRef();
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("model loaded");
  };

  useEffect(() => {
    loadModel();
  }, []);

  const handelQuestions = async (e) => {
    if (e.which === 13 && model != null) {
      console.log("question loaded");

      const passage = Passage.current.value;
      const questions = Question.current.value;

      const result = await model.findAnswers(questions, passage);
      console.log(result);
      setAnswer(result);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        {model == null ? (
          <div>Model is loading</div>
        ) : (
          <Fragment>
            <p>passage</p>
            <textarea ref={Passage} cols="100" rows="30" />
            Questions
            <input
              type="text"
              ref={Question}
              onKeyDownCapture={handelQuestions}
              size="80"
            />
            Answers
            {answer
              ? answer.map((answer, idx) => (
                  <div>
                    {" "}
                    Answer {idx + 1} - {answer.text}, ({answer.score})
                  </div>
                ))
              : ""}
          </Fragment>
        )}
      </header>
    </div>
  );
};

export default App;
