import AppConfig from "../../config/AppConfig";
import "../../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="mt-5 text-white bg-secondary 1fixed-bottom">
      <div className="footer-div">
        <p className="copyright">
          © {new Date().getFullYear()} {AppConfig.APP_NAME}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
