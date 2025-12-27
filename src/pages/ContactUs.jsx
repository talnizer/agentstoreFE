import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/jumbotron.css";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
export default function ContactUs() {
  const ShowImageWithLabels = () => {
    return (
      <div className="row 1align-items-lg-center">
        <div className="px-0 col-12"
          style={{
            position: "relative",
            textAlign: "center",
            color: "white",
          }}>
          <div
            className="jumbotron w-100 p-0 d-flex align-items-start m-0 pt-0"
            style={{
              background: `url("/images/contact_green.jpg")`,
              borderRadius: '0'
            }}
          >

          </div>
          <div className="1h4 mt-3 1col text-left d-block 1d-lg-none"
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",

            }}>
            <h1
              className="mb-0 pl-2 font-weight-bold display-5"
            >
              Get in touch
            </h1>
          </div>
        </div></div>
    );
  };
  return (
    // <!-- Contact 2 - Bootstrap Brain Component -->
    <section className="1py-md-5">
      <div className="container-fluid">
        <ShowImageWithLabels></ShowImageWithLabels>
        <div className="py-3 justify-content-center row align-items-lg-center">
          <div className="col-10 col-lg-8">
            <div className="row justify-content-xl-center">
              <div className="col-12 col-xl-11">
                <h2 className="h1 mb-3">Contact</h2>
                {/* <div className="d-flex mb-4">
                  <div className="me-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-3">Address</h4>
                    <address className="mb-0 text-secondary">8014 Edith Blvd NE, Albuquerque, New York, United States</address>
                  </div>
                </div> */}
                <div className="d-flex mb-4">
                  <div className="me-4 app-text-color 1text-primary">
                    <FontAwesomeIcon style={{ height: "32px", width: "32px" }} className="px-1" icon={faPhoneAlt} />
                  </div>
                  <div>
                    <h4 className="mb-3">Phone</h4>
                    <p className="mb-0">
                      <a className="link-secondary text-decoration-none" href="tel:+15057922430">+91-8619932643</a>
                    </p>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="me-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                      width="32" height="32" fill="green" >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                  </div>
                  <div>
                    <h4 className="mb-3">WhatsApp</h4>
                    <p className="mb-0">
                      <a className="link-secondary text-decoration-none" href="tel:+15057922430">+91-8619932643</a>
                    </p>
                  </div>
                </div>
                {/* <div className="d-flex">
                  <div className="me-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-3">E-Mail</h4>
                    <p>
                      <a className="link-secondary text-decoration-none" href="mailto:demo@yourdomain.com">demo@yourdomain.com</a>
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
