import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faLink } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function SocialShare(props) {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState(false);
  const [socialLink, setSocialLink] = useState("");

  useEffect(() => {
    setLink(props?.inputs?.link);
    setSocialLink(props?.inputs?.description + " " + props?.inputs?.link);
  }, [props]);


  const copyToClipBoard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(socialLink);
      setCopied(true);
      return;
    }
    return Promise.reject('Error while copy');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <h1 className="text-3xl font-bold mb-8 text-white">Share This Awesome Content</h1> */}
      <div className="flex text-center space-x-4 mb-8">
        <FacebookShareButton className="mx-1"
          url={socialLink}
        // quote="Check out this amazing content!"
        // hashtag="#react"
        >
          <FacebookIcon size={30} borderRadius={25} />
        </FacebookShareButton>
        <TwitterShareButton className="mx-1"
          url={socialLink}
        // title="My awesome article"
        >
          <TwitterIcon size={30} borderRadius={25} />
        </TwitterShareButton>
        <WhatsappShareButton className="mx-1"
          url={socialLink}
        // title="Don't miss this!"
        // body="This is a must-read!"
        >
          <WhatsappIcon size={30} borderRadius={25} />
        </WhatsappShareButton>
        {/* {!copied && <div className="mx-1 btn p-0 border border-dark1 bg-muted text-white1" onClick={copyToClipBoard}>
          <FontAwesomeIcon size={30} className="mx-1" icon={faLink} />
          </div>}
          {copied && <div size={30} className="mx-1 btn p-0 disabled text-white1" onClick={copyToClipBoard}>
          <FontAwesomeIcon className="mx-1" icon={faCheck} />
          </div>} */}
        <div style={{ width: 30, height: 30 }} className="mx-1 btn p-0 border border-dark1 1bg-muted text-white1" onClick={copyToClipBoard}>
          {!copied && <FontAwesomeIcon className="mx-1" icon={faLink} />}
          {copied && <FontAwesomeIcon size="lg" className="mx-1 text-success" icon={faCheck} />}
        </div>
      </div>
    </div>
  );
}
export default SocialShare;