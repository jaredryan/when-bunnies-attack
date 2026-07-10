import { useState, useEffect, useRef, memo } from "react";
import History from "./History";

// Presentation-only classifier: does this line of dialogue read as
// narration or as a quoted/spoken aside, and if spoken, whose voice is
// it in? Doesn't touch message content, decision loop, or timing —
// just tells the renderer which classNames to add to a line.
const SPEAKER_PATTERN = /^([A-Za-z][A-Za-z\s]{0,30}):\s*"/;

export const classifyDialogueLine = (line = "") => {
  const hasQuote = line.includes('"');
  const speakerMatch = line.match(SPEAKER_PATTERN);
  const speaker = speakerMatch ? speakerMatch[1].trim() : null;
  const isExternalSpeaker = !!speaker && speaker.toLowerCase() !== "you";

  return { hasQuote, speaker, isExternalSpeaker };
};

export const Typewriter = ({
  text,
  speed,
  done,
  onDone,
  skip,
  scrollRef,
  reset,
  paused,
  setHasWonImage,
  alreadySetHasWonImage,
  finalEncounterLineText = null,
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

      if (displayed?.includes('meadow') && setHasWonImage && !alreadySetHasWonImage) {
        setHasWonImage()
      }

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
  }, [text, speed, skip, history, onDone, done, scrollRef, paused, alreadySetHasWonImage, setHasWonImage, displayed]);

  // Pair each rendered chunk with the *complete* line it belongs to, not
  // just the characters typed so far — classification (quote/speaker
  // styling) has to be known from the first character, using the full
  // line (`text`), or the indent/highlight would visibly pop in mid-type
  // once enough characters of a quote mark or speaker prefix had appeared.
  let entries = history.map((line) => ({ content: line, fullText: line }));
  if (displayed) entries = [...entries, { content: displayed, fullText: text }];

  return entries.map(({ content, fullText }, index) => {
    const { hasQuote, speaker, isExternalSpeaker } = classifyDialogueLine(fullText);
    const isYou = speaker?.toLowerCase() === "you";
    // Matched by content, not "is this currently typing" — a positional
    // check loses the flag the instant this line finishes and moves from
    // `displayed` into history, which happens right as the battle
    // triggers. The bunnies get to be threatening, not the player — a
    // "You:" line never turns red even if it's the last pre-battle line.
    const isThreatening =
      hasQuote && !isYou && finalEncounterLineText != null && fullText === finalEncounterLineText;
    const className = [
      "gameLog",
      hasQuote && "quoted",
      hasQuote && isThreatening && "threatening",
      hasQuote && isExternalSpeaker && !isThreatening && "externalSpeaker",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <p key={content + index} className={className}>
        {content}
      </p>
    );
  });
};

const DialogueBox = ({
  lines,
  speed = 40,
  onDone,
  resetBox,
  windowOnly = false,
  paused = false,
  setHasWonImage,
  alreadySetHasWonImage,
  hasEncounter = false,
}) => {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIsOpen, setHistoryIsOpen] = useState(false);
  const [historyIsClosing, setHistoryIsClosing] = useState(false);
  const [historyIsOpening, setHistoryIsOpening] = useState(false);
  const scrollRef = useRef(null);

  const closeHistory = () => {
    setHistoryIsClosing(true)
    setTimeout(() => {
      setHistoryIsClosing(false);
      setHistoryIsOpen(false)
    }, 750);
  }

  const openHistory = () => {
    setHistoryIsOpening(true)
    setTimeout(() => {
      setHistoryIsOpening(false);
      setHistoryIsOpen(true)
    }, 750);
  }

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

  // Identified by content rather than "is this the current index" so the
  // flag survives a line moving from displayed → Typewriter's internal
  // history (which happens right as the battle triggers).
  const finalEncounterLineText = hasEncounter ? lines[lines.length - 1] : null;

  return (
    <div className="dialogueBoxContainer">
      <div ref={scrollRef} className="dialogueContainer">
        <Typewriter
          text={lines[current]}
          speed={speed}
          skip={skip}
          done={done}
          scrollRef={scrollRef}
          finalEncounterLineText={finalEncounterLineText}
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
          paused={paused || historyIsOpen || historyIsOpening}
          setHasWonImage={setHasWonImage}
          alreadySetHasWonImage={alreadySetHasWonImage}
        />
      </div>
      {windowOnly ? null : (
        <div className="dialogueOptions">
          <History
            history={history}
            open={historyIsOpen}
            historyIsOpening={historyIsOpening}
            historyIsClosing={historyIsClosing}
            openHistory={openHistory}
            closeHistory={closeHistory}
          />
          <button
            className="next"
            onClick={handleSkip}
            disabled={done && current >= lines.length - 1}
          >
            <span className="btnText">Skip</span>
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
  prevProps.paused === nextProps.paused &&
  prevProps.hasEncounter === nextProps.hasEncounter;

export default memo(DialogueBox, arePropsEqual);
