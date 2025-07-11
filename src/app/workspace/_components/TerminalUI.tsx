import React, { useState, useRef, useEffect } from "react"

// Simple Python expression evaluator (very limited, for demo only)
function evaluatePython(input: string): string {
    try {
        // Only support simple math and print for demo
        if (/^print\((.*)\)$/.test(input.trim())) {
            // Extract and return the printed value
            return input.trim().replace(/^print\((.*)\)$/, '$1')
        }
        // Evaluate simple math
        // eslint-disable-next-line no-eval
        const result = eval(input)
        return result !== undefined ? String(result) : ''
    } catch {
        return 'SyntaxError'
    }
}

const TerminalUI = () => {
    const [input, setInput] = useState("")
    const [history, setHistory] = useState<{ prompt: string, command: string, output?: string }[]>([])
    const [isMultiline, setIsMultiline] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }, [history])

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (input.trim() === "") return
            // Check for multiline (ends with ':')
            if (input.trim().endsWith(":")) {
                setInput(input + "\n")
                setIsMultiline(true)
                return
            }
            // If multiline, check if user finished (empty line)
            if (isMultiline && input.split("\n").slice(-1)[0].trim() === "") {
                setHistory([...history, { prompt: ">>>", command: input, output: "(multiline block)" }])
                setInput("")
                setIsMultiline(false)
                return
            }
            // Single line or finished multiline
            const output = evaluatePython(input)
            setHistory([...history, { prompt: ">>>", command: input, output }])
            setInput("")
            setIsMultiline(false)
        }
    }

    return (
        <div className="h-full w-full flex flex-col p-2 bg-black text-green-400 font-mono text-base overflow-y-auto">
            <div className="flex-1 overflow-y-auto mb-2">
                {history.map((entry, idx) => (
                    <div key={idx}>
                        {entry.command.split("\n").map((line, i) => (
                            <div key={i}>
                                <span className="text-yellow-300">{i === 0 ? entry.prompt : '... '}</span>{line}
                            </div>
                        ))}
                        {entry.output && (
                            <div className="pl-8 text-white">{entry.output}</div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-start border-t border-gray-700 pt-2">
                <span className="mr-2 text-yellow-300">{isMultiline ? '... ' : '>>> '}</span>
                <textarea
                    ref={textareaRef}
                    className="flex-1 bg-black text-green-400 outline-none border-none font-mono resize-none h-10 min-h-[2.5rem] max-h-32"
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows={isMultiline ? 3 : 1}
                    spellCheck={false}
                />
            </div>
            <div className="text-xs text-gray-400 mt-1">Press Enter to run, Shift+Enter for new line</div>
        </div>
    )
}

export default TerminalUI 