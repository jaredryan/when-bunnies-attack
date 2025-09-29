import { useState, useEffect, useRef } from "react";
import History from "./History";

export const Typewriter = ({
  text,
  speed,
  done,
  onDone,
  skip,
  scrollRef,
  reset,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (reset) {
      setDisplayed("");
      setHistory([]);
    }
  }, [reset]);

  useEffect(() => {
    if (done) return;

    const endTyping = () => {
      onDone?.();
      setDisplayed("");
      setHistory([...history, text]);
      if (scrollRef?.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    if (skip) {
      setDisplayed(text);
      endTyping();
      return;
    }

    let i = -1;
    const interval = setInterval(() => {
      i++;

      if (text) {
        if (i >= text.length) {
          clearInterval(interval);
          endTyping();
          return;
        }

        setDisplayed((prev) => prev + text[i]);
        if (scrollRef?.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, skip, history, onDone, done, scrollRef]);

  let textToDisplay = history;
  if (displayed) textToDisplay = [...textToDisplay, displayed];

  return textToDisplay.map((content) => (
    <p key={content} className="gameLog">
      {content}
    </p>
  ));
};

const DialogueBox = ({
  lines,
  speed = 40,
  onDone,
  resetBox,
  windowOnly = false,
}) => {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [history, setHistory] = useState([]);
  const scrollRef = useRef(null);

  // Reset state when lines prop changes
  useEffect(() => {
    setCurrent(0);
    setDone(false);
    setSkip(false);
    setTimeoutId(null);
  }, [lines]);

  const advanceToNextLine = () => {
    setCurrent((c) => c + 1);
    setDone(false);
    setSkip(false);
  };

  const handleSkip = () => {
    if (!done) setSkip(true);
    else {
      if (timeoutId) clearTimeout(timeoutId);
      if (current < lines.length - 1) {
        advanceToNextLine();
      } else {
        onDone();
      }
    }
  };

  return (
    <div className="dialogueBoxContainer">
      <div ref={scrollRef} className="dialogueContainer">
        <Typewriter
          text={lines[current]}
          speed={speed}
          skip={skip}
          done={done}
          scrollRef={scrollRef}
          onDone={() => {
            setDone(true);
            setHistory((h) => [...h, lines[current]]);
            if (current < lines.length - 1) {
              const nextDialogueTimeoutId = setTimeout(advanceToNextLine, 1000);
              setTimeoutId(nextDialogueTimeoutId);
            } else {
              onDone();
            }
          }}
          reset={resetBox}
        />
      </div>
      {windowOnly ? null : (
        <div className="dialogueOptions">
          <History history={history} />
          <button
            className="next"
            onClick={handleSkip}
            disabled={done && current >= lines.length - 1}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default DialogueBox;
