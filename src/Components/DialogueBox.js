import { useState, useEffect, useRef, memo } from "react";
import History from "./History";

export const Typewriter = ({
  text,
  speed,
  done,
  onDone,
  skip,
  scrollRef,
  reset,
  paused,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [history, setHistory] = useState([]);
  const indexRef = useRef(-1);

  useEffect(() => {
    if (reset) {
      setDisplayed("");
      setHistory([]);
      indexRef.current = -1;
    }
  }, [reset]);

  useEffect(() => {
    if (done || paused) return;

    const endTyping = () => {
      onDone?.();
      setDisplayed("");
      setHistory([...history, text]);
      indexRef.current = -1;
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

    const interval = setInterval(() => {
      indexRef.current++;

      if (text) {
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          endTyping();
          return;
        }

        setDisplayed((prev) => prev + text[indexRef.current]);
        if (scrollRef?.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, skip, history, onDone, done, scrollRef, paused]);

  let textToDisplay = history;
  if (displayed) textToDisplay = [...textToDisplay, displayed];

  return textToDisplay.map((content, index) => (
    <p key={content + index} className="gameLog">
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
  paused = false,
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
          paused={paused}
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

const arePropsEqual = (prevProps, nextProps) =>
  JSON.stringify(prevProps.lines) === JSON.stringify(nextProps.lines) &&
  prevProps.speed === nextProps.speed &&
  prevProps.resetBox === nextProps.resetBox &&
  prevProps.windowOnly === nextProps.windowOnly &&
  prevProps.paused === nextProps.paused;

export default memo(DialogueBox, arePropsEqual);
