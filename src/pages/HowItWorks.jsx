import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTaxi,
  faIndianRupee,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
// import { faSort, faFilter } from "@fortawesome/fontawesome-svg-core";

export default function HowItWorks() {
  return (
    <div className="py-4 bg-light border1 1border-top 1border-dark container-fluid justify-content-center text-center mb-41">
      <div className="row 1col-xxl-7">
        {/* <span className="text-dark">Steps</span> */}
        <h2 className="app-text-color display-2 fw-bold">How it Works</h2>
        <p className="lead">
          Just Register your store and upload your menu. Use the generated QRCode as Menu. Just share it with customers and let them scan it & access your menu with ease.
          {/* Raise your Travel Query and let others to connect with you OR
          Find people who are planning to travel in your route and Connect with them.
          This way you can know your co-travllers before the trip. */}

        </p>
      </div>
      <div className="row">
        <div className="mt-5 col-md-3">
          <div className="text-center position-relative">
            <div
              className="step-icon mx-auto app-bg-color border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "120px", height: "120px" }}
            >
              <FontAwesomeIcon
                className="h-25 text-white px-1"
                icon={faSearch}
              />
            </div>
            <h4 className="mt-3 fs-5">Step 1</h4>
            <p className="lead text-dark mt-4 fs-5 px-lg-3 mb-5 mb-lg-0">
              Register your store. Update detailed store profile and upload your Menu.
              {/* Just enter your route details and Search for Co-Travellers. */}
            </p>
            <div
              className="arrow-icon position-absolute d-none d-lg-block"
              style={{ top: "50px", right: "-25px" }}
            ></div>
          </div>
        </div>
        <div className="mt-5 col-md-3">
          <div className="text-center position-relative">
            <div
              className="step-icon mx-auto app-bg-color border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "120px", height: "120px" }}
            >
              <FontAwesomeIcon
                className="h-25 text-white px-1"
                icon={faCartShopping}
              />
            </div>
            <h4 className="mt-3 fs-5">Step 2</h4>
            <p className="lead text-dark mt-4 fs-5 px-lg-3 mb-5 mb-lg-0">
              Get the auto-generated QRCode. Print it and place it wherever you want.
              {/* Choose suitable match and raise Connect request. Sent Requests will show-up in your Account. */}
            </p>
            <div
              className="arrow-icon d-none d-lg-block position-absolute"
              style={{ top: "50px", right: "-25px" }}
            ></div>
          </div>
        </div>
        <div className="mt-5 col-md-3">
          <div className="text-center position-relative">
            <div
              className="step-icon mx-auto app-bg-color border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "120px", height: "120px" }}
            >
              <FontAwesomeIcon className="h-25 text-white px-1" icon={faTaxi} />
            </div>
            <h4 className="mt-3 fs-5">Step 3</h4>
            <p className="lead text-dark mt-4 fs-5 px-lg-3 mb-5 mb-lg-0">
              Let customers scan the QRCode, access your Menu and place the order faster.
              {/* If your Co-Travellers Accept your request, you can see their contact details and plan travel together. */}
            </p>
          </div>
        </div>
        <div className="mt-5 col-md-3">
          <div className="text-center position-relative">
            <div
              className="step-icon mx-auto app-bg-color border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "120px", height: "120px" }}
            >
              <FontAwesomeIcon
                className="h-25 text-white px-1"
                icon={faIndianRupee}
              />
            </div>
            <h4 className="mt-3 fs-5">Step 4</h4>
            <p className="lead text-dark mt-4 fs-5 px-lg-3 mb-5 mb-lg-0">
              Add-On: Each share of the QRCode will auto spread your brand name.
              {/* You can Create your own Travel Query so that others can connect with you */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
