import React, { useState, useRef, useEffect } from "react";

const ScrollableText = ({ text, className, onScrollEnd }) => {
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Consider scroll reached end when user has scrolled to bottom (with a small threshold)
      const isAtEnd = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;

      if (isAtEnd && !hasReachedEnd) {
        setHasReachedEnd(true);
        if (onScrollEnd) onScrollEnd(true);
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      const scrollOptions = {
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      };
      scrollRef.current.scrollTo(scrollOptions);
      setHasReachedEnd(true);
      if (onScrollEnd) onScrollEnd(true);
    }
  };

  return (
    <div className={`string text ${className} string text relative`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar h-fit lg:h-48 overflow-hidden overflow-y-scroll max-h-full p-4 scrollbar-thin"
      >
        <p className="whitespace-pre-line text-placeholder-text leading-relaxed">
          {text}
        </p>
      </div>
      {!hasReachedEnd && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-2 right-4 text-xs text-accent hover:text-accent/80 bg-white/80 rounded-full p-1 shadow-sm flex items-center justify-center transition-all"
          aria-label="Scroll to bottom"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollableText;
