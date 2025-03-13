import React from "react";



const ScrollableText = ({ text, className }) => {
  return (
    <div className={`string text ${className} string text`}>
      <div className="scrollbar h-fit lg:h-48 overflow-hidden  overflow-y-scroll max-h-full p-4 scrollbar-thin ">
        <p className="whitespace-pre-line text-placeholder-text leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ScrollableText;
