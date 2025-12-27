import { faChartLine, faCheck, faListAlt, faPen, faWebAwesome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WhatYouGet() {
  return (
    <section id="services" className="text-white text-center p-5 mb-3 bg-dark rounded-5">
      <h2 className="text-white my-4 font-weight-bold display-4">What You Get</h2>
      <div className="row justify-content-center gy-4 gy-md-0 gx-xxl-5X">
        <div className="col-8 1col-md-6 pt-5 1border rounded-5 border-white">
          <div className="d-flex justify-content-center pb-3">
            <div>
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faListAlt}
              />
              <h2 className="media-body text-light h4 mb-3">QR Based Digital Menu</h2>
              <p className="text-light mb-0">No PDF menu. It'd fully customizable, always up-to-date, social shareable, no printing required.</p>
            </div>
          </div>
          <div className="mt-3 text-left text-white d-flex justify-content-start">
            <span className="col-6 border border-white" />
          </div>
        </div>

        <div className="col-8 1col-md-6 pt-5 1border rounded-5 border-white">
          <div className="d-flex justify-content-center pb-3">
            <div>
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faCheck}
              />
              <h2 className="media-body text-light h4 mb-3">Digital Ordering System</h2>
              <p className="text-light mb-0">Staff can take orders on phone or let guests place orders at their pace - reduce wait time and record order data</p>
            </div>
          </div>
          <div className="mt-3 text-left d-flex justify-content-end">
            <span className="col-6 border border-white" />
          </div>
        </div>

        <div className="col-8 1col-md-6 pt-5 1border rounded-5 border-white">
          <div className="d-flex justify-content-center pb-3">
            <div>
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faPen}
              />
              <h2 className="media-body text-light h4 mb-3">Instant Feedback Collection</h2>
              <p className="text-light mb-0">Capture reviews before they hit Google - and resolve issues instantly.</p>
            </div>
          </div>
          <div className="mt-3 text-left d-flex justify-content-start">
            <span className="col-6 border border-white" />
          </div>
        </div>

        <div className="col-8 1col-md-6 pt-5 1border rounded-5 border-white">
          <div className="d-flex justify-content-center pb-3">
            <div>
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faChartLine}
              />

              <h2 className="media-body text-light h4 mb-3">Analytics Dashboard</h2>
              <p className="text-light mb-0">Track order trends, menu performance & guest satisfaction.</p>
            </div>
          </div>
          <div className="mt-3 text-left d-flex justify-content-end">
            <span className="col-6 border border-white" />
          </div>
        </div>

        <div className="col-8 1col-md-6 pt-5 1border rounded-5 border-white">
          <div className="d-flex justify-content-center pb-3">
            <div>
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faWebAwesome}
              />

              <h2 className="media-body text-light h4 mb-3">No App. No Hassle</h2>
              <p className="text-light mb-0">Browser friendly. No download - Just Scan, Order and Enjoy.
              </p>
            </div>
          </div>
          <div className="mt-3 text-left d-flex justify-content-start">
            <span className="col-6 border border-white" />
          </div>
        </div>
      </div>
    </section>
  );
}

