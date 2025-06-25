import React, { useEffect, useRef, useState, ReactNode, Children, isValidElement, cloneElement } from "react";

interface TypingTitleProps {
    children: ReactNode;
    speed?: number; // milliseconds per character
    className?: string;
}

function flattenChildren(children: ReactNode): ReactNode[] {
    const result: ReactNode[] = [];
    Children.forEach(children, (child) => {
        if (typeof child === "string") {
            for (const char of child) result.push(char);
        } else if (isValidElement(child)) {
            const childElement = child as React.ReactElement<any>;
            if (typeof childElement.props.children === "string" || Array.isArray(childElement.props.children)) {
                const inner = flattenChildren(childElement.props.children);
                inner.forEach((c, idx) => {
                    result.push(cloneElement(childElement, { key: `${childElement.key || ""}-${idx}` }, c));
                });
            } else {
                result.push(childElement);
            }
        } else if (Array.isArray(child)) {
            result.push(...flattenChildren(child));
        }
    });
    return result;
}

const TypingTitle: React.FC<TypingTitleProps> = ({
    children,
    speed = 70,
    className = "",
}) => {
    const flatChildren = flattenChildren(children);
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const timeoutRef = useRef<number | null>(null);
    const cursorIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        let i = isDeleting ? flatChildren.length : 0;

        const type = () => {
            if (!isDeleting) {
                setIndex(i + 1);
                i++;
                if (i < flatChildren.length) {
                    timeoutRef.current = window.setTimeout(type, speed);
                } else {
                    timeoutRef.current = window.setTimeout(() => {
                        setIsDeleting(true);
                    }, 3000);
                }
            } else {
                setIndex(i - 1);
                i--;
                if (i > 0) {
                    timeoutRef.current = window.setTimeout(type, speed);
                } else {
                    timeoutRef.current = window.setTimeout(() => {
                        setIsDeleting(false);
                    }, 0);
                }
            }
        };

        timeoutRef.current = window.setTimeout(type, speed);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed, isDeleting, children]);

    // Blinking cursor effect
    useEffect(() => {
        cursorIntervalRef.current = window.setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => {
            if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
        };
    }, []);

    const isTyping = (!isDeleting && index < flatChildren.length) || (isDeleting && index > 0);

    return (
        <h2 className={className}>
            {flatChildren.slice(0, index)}
            {isTyping && (
                <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
            )}
        </h2>
    );
};

export default TypingTitle;