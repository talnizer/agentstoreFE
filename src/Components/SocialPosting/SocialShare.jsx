import React, { useState } from 'react';
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinIcon,
  XIcon,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import CopyButton from './CopyButton';

const SocialShare = ({ content }) => {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4">
      <div className="1d-flex gap-2 mb-2">
        {/* Main Action Buttons */}
        <button
          className="btn btn-primary m-1"
          onClick={() => setShowShare(!showShare)}
        >
          {showShare ? "Hide Sharing" : "📤 Share"}
        </button>

        <CopyButton text={content} />
      </div>

      {/* Conditionally Rendered Share Chips */}
      {showShare && (
        <div className="p-3 share-menu border rounded bg-light animate-fade-in">
          {/* <p className="small text-muted mb-2"></p> */}
          <div className="d-flex gap-3">
            <TwitterShareButton url={shareUrl} title={content}>
              <XIcon size={32} round />
            </TwitterShareButton>

            <div onClick={handleCopy}>
              <LinkedinShareButton url={shareUrl} summary={content}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
            <WhatsappShareButton url={shareUrl} title={content}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <div onClick={handleCopy}>
              <FacebookShareButton url={shareUrl} quote={content}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;