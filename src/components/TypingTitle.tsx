import React, { useEffect, useRef, useState } from "react";

interface TypingTitleProps {
    text: string;
    speed?: number; // milliseconds per character
    className?: string;
}

const TypingTitle: React.FC<TypingTitleProps> = ({
    text,
    speed = 70,
    className = "",
}) => {
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const timeoutRef = useRef<number | null>(null);
    const cursorIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        let i = isDeleting ? text.length : 0;

        const type = () => {
            if (!isDeleting) {
                setDisplayed(text.slice(0, i + 1));
                i++;
                if (i < text.length) {
                    timeoutRef.current = setTimeout(type, speed);
                } else {
                    timeoutRef.current = setTimeout(() => {
                        setIsDeleting(true);
                    }, 3000); // pause before deleting
                }
            } else {
                setDisplayed(text.slice(0, i - 1));
                i--;
                if (i > 0) {
                    timeoutRef.current = setTimeout(type, speed);
                } else {
                    timeoutRef.current = setTimeout(() => {
                        setIsDeleting(false);
                    }, 0); // pause before restarting
                }
            }
        };

        timeoutRef.current = setTimeout(type, speed);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, speed, isDeleting]);

    // Blinking cursor effect
    useEffect(() => {
        cursorIntervalRef.current = window.setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 10);
        return () => {
            if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
        };
    }, []);

    // Show cursor only while typing or deleting
    const isTyping = (!isDeleting && displayed.length < text.length) || (isDeleting && displayed.length > 0);

    return (
        <h2 className={className}>
            {displayed}
            {isTyping && (
                <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
            )}
        </h2>
    );
};

export default TypingTitle;