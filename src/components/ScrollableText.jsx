import React from "react";

import '@styles/tailwind.css';

const ScrollableText = ({ text }) => {
  return (
    <div className="transform  w-full max-w-lg   bg-transparent ">
      <div className="scrollbar h-48 overflow-y-auto p-4 scrollbar-thin ">
        <p className="whitespace-pre-line text-placeholder-text leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ScrollableText;
