import { useState } from "react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <button
      onClick={handleCopy}
      className={`m-1 btn ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
    >
      {copied ? "✅ Copied!" : "📋 Copy"}
    </button>
  );
};

export default CopyButton;