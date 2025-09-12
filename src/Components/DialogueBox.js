import { useState, useEffect, useRef } from "react"
import History from "./History"

const Typewriter = ({ text, speed, done, onDone, skip, scrollRef }) => {
    const [displayed, setDisplayed] = useState("")
    const [history, setHistory] = useState([])

    useEffect(() => {
        if (done) return

        const endTyping = () => {
            onDone?.()
            setDisplayed("")
            setHistory([...history, text])
            if (scrollRef?.current) {
                scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }
        }

        if (skip) {
            setDisplayed(text)
            endTyping()
            return
        }

        let i = -1
        const interval = setInterval(() => {
            i++

            if (text) {
                if (i >= text.length) {
                    clearInterval(interval)
                    endTyping()
                    return
                }

                setDisplayed((prev) => prev + text[i])
                if (scrollRef?.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                }
            }
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed, skip, history, onDone, done, scrollRef])

    let textToDisplay = history
    if (displayed) textToDisplay = [...textToDisplay, displayed]

    return textToDisplay.map((content) => <p className="gameLog">{content}</p>)
}

export default function DialogueBox({ lines, speed = 40 }) {
    const [current, setCurrent] = useState(0)
    const [done, setDone] = useState(false)
    const [skip, setSkip] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null)
    const [history, setHistory] = useState([])
    const scrollRef = useRef(null);

    const advanceToNextLine = () => {
        setCurrent((c) => c + 1)
        setDone(false)
        setSkip(false)
    }

    const handleSkip = () => {
        if (!done) setSkip(true)
        else {
            if (timeoutId) clearTimeout(timeoutId)
            if (current < lines.length - 1) {
                advanceToNextLine()
            }
        }
    }

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
                        setDone(true)
                        setHistory((h) => [...h, lines[current]])
                        if (current < lines.length - 1) {
                            const nextDialogueTimeoutId = setTimeout(advanceToNextLine, 1000)
                            setTimeoutId(nextDialogueTimeoutId)
                        }
                    }}
                />
            </div>
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
        </div>
    )
}
