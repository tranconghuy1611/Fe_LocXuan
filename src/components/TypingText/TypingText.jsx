import { useState, useEffect } from "react";

export default function TypingText({ text, speed = 15, onDone }) {

    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let index = 0;
        setDisplayed("");

        const interval = setInterval(() => {
            index++;
            setDisplayed(text.slice(0, index));

            if (index >= text.length) {
                clearInterval(interval);
                onDone && onDone(); 
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);


    return <span>{displayed}</span>;
}