import React from "react";

const ScrollableText = ({ text }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg border border-gray-50 bg-transparent rounded-md shadow-sm">
      <div className="scrollbar h-48 overflow-y-auto p-4 scrollbar-thin ">
        <p className="whitespace-pre-line text-placeholder-text leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ScrollableText;
