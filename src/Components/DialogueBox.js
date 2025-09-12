import { useState, useEffect } from "react"
import History from "./History"

const Typewriter = ({ text, speed, done, onDone, skip }) => {
    const [displayed, setDisplayed] = useState("")
    const [history, setHistory] = useState([])

    useEffect(() => {
        if (done) return

        const endTyping = () => {
            onDone?.()
            setDisplayed("")
            setHistory([...history, text])
        }

        if (skip) {
            setDisplayed(text)
            endTyping()
            return
        }

        let i = -1
        const interval = setInterval(() => {
            i++

            if (i >= text.length) {
                clearInterval(interval)
                endTyping()
                return
            }

            setDisplayed((prev) => prev + text[i])
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed, skip, history, onDone, done])

    let textToDisplay = history
    if (displayed) textToDisplay = [...textToDisplay, displayed]

    return textToDisplay.map((content) => <p className="gameLog">{content}</p>)
}

export default function DialogueBox({ lines, speed = 40 }) {
    const [current, setCurrent] = useState(0)
    const [done, setDone] = useState(false)
    const [skip, setSkip] = useState(false)
    const [history, setHistory] = useState([])

    const advanceToNextLine = () => {
        setCurrent((c) => c + 1)
        setDone(false)
        setSkip(false)
    }

    const handleNext = () => {
        if (!done && !skip) {
            // Skip typing, show full line
            setSkip(true)
        } else {
            advanceToNextLine()
        }
    }

    return (
        <div className="p-4 border rounded bg-gray-900 text-white max-w-lg">
            <Typewriter
                text={lines[current]}
                speed={speed}
                skip={skip}
                done={done}
                onDone={() => {
                    setDone(true)
                    setHistory((h) => [...h, lines[current]])
                    if (current < lines.length - 1)
                        setTimeout(advanceToNextLine, 2000)
                    }
                }
            />
            <div className="dialogueOptions">
                <History history={history} />
                <button
                    className="next"
                    onClick={handleNext}
                    disabled={current >= lines.length - 1}
                >
                    {done || skip ? "Next" : "Skip"}
                </button>
            </div>
        </div>
    )
}
