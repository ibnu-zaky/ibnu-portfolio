"use client";

import { useEffect, useRef, useState } from "react";

export default function TypedText({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState("");
  const currentPhraseIndex = useRef(0);
  const currentCharIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loop = () => {
      const currentPhrase = phrases[currentPhraseIndex.current];
      
      if (!isDeleting.current) {
        setText(currentPhrase.slice(0, currentCharIndex.current + 1));
        currentCharIndex.current++;

        if (currentCharIndex.current === currentPhrase.length) {
          isDeleting.current = true;
          timeoutId = setTimeout(loop, 1800);
          return;
        }
      } else {
        setText(currentPhrase.slice(0, currentCharIndex.current - 1));
        currentCharIndex.current--;

        if (currentCharIndex.current === 0) {
          isDeleting.current = false;
          currentPhraseIndex.current = (currentPhraseIndex.current + 1) % phrases.length;
        }
      }

      timeoutId = setTimeout(loop, isDeleting.current ? 45 : 95);
    };

    timeoutId = setTimeout(loop, 95);

    return () => clearTimeout(timeoutId);
  }, [phrases]);

  return <span id="typed">{text}</span>;
}
