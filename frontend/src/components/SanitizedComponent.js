import React from "react";
import DOMPurify from "dompurify";

function SanitizedComponent({ className, text }) {
  const purifiedText = { __html: DOMPurify.sanitize(text) };

  return (
    <div className={className} dangerouslySetInnerHTML={purifiedText}></div>
  );
}

export default SanitizedComponent;
