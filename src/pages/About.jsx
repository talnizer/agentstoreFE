import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTaxi,
  faIndianRupee,
  faCartShopping,
  faDigitalTachograph,
  faShareNodes,
  faArrowRight,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PathConstants from "../routes/PathConstants";

export default function About() {
  const navigate = useNavigate();
  const goToAboutRestaurant = () => {
    navigate(PathConstants.ABOUT_RESTAURANT);
  }
  return (
    <>
      {/* ........................ */}
      {/* <!-- About 1 - Bootstrap Brain Component --> */}
      <section>
        <div className="mt-4 container">
          <div className="text-right"><div className="btn app-bg-color" onClick={goToAboutRestaurant}>Are you a Restaurant?</div></div>
          <h1 className="text-center app-text-color display-3 fw-bold">About Us</h1>
        </div>
      </section>
      <section className="p-3 py-md-5">
        <div className="container">
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 1col-lg-6 1col-xl-7">
              <div className="row justify-content-center">
                <div className="col-12 col-xl-11">
                  <p className="h4 mb-2">Smart, handy and faster way to order at restaurant.
                  </p>
                  <p className="lead fs-4 text-secondary mb-5">
                    We provide a platform which overcomes hassle of ordering food at restaurants.
                    How? Our QR Code linked menus make it possible. Our partner restaurants have digitised their
                    menus which are linked with QR Codes. Just scan the code at restaurant then explore the menu and place the order.
                  </p>
                  <div className="row gy-4 gy-md-0 gx-xxl-5X">
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="media">
                          <FontAwesomeIcon size="2x"
                            className="mr-3 app-text-color px-1"
                            icon={faDigitalTachograph}
                          />
                          <div>
                            <h2 className="media-body h4 mb-3">Restaurant Digitization</h2>
                            <p className="text-secondary mb-0">We are crafting digital methods like QR Code based E-Menu to overcome challenges involved in food ordering and order management at restaurants.</p>
                          </div></div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="media">
                          <FontAwesomeIcon size="2x"
                            className="mr-3 app-text-color px-1"
                            icon={faShareNodes}
                          />
                          <div>
                            <h2 className="h4 mb-3">Digital Experience</h2>
                            <p className="text-secondary mb-0">Just use your phone and scan the code. Get a unique digital experience of Faster and Handy access to menus.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About Section --> */}
      <section id="about-section" className="px-3 py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Our Mission</h3>
              <ul>
                To build a robust infra for restaurants services so that food lovers
                can enjoy speedy and hassle free dineout services.
              </ul>
            </div>
            <div className="col-md-6">
              <h3>Our Vision</h3>
              <ul>To overcome hassle of dineout by providing smart digital experience at restaurants by making digitising them and make it pan-India one stop solution.
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="py-4 bg-white border1 1border-top 1border-dark container-fluid justify-content-center text-center mb-41">
        <div className="row">
          <h1 className="mt-3 app-text-color fw-bold">How it Works</h1>
        </div>
        <div className="row bg-white mx-2 py-4 rounded"><div className="mt-0 row 1col-xxl-7">

          <p className="lead">
            We digitise restaurant menus which can be accessed just by scanning a QR Code. This reduces wait time and unnecessary interaction with waiters.
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
                  Just scan the QR Code at restaurant where you dineout.
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
                  Open the portal and get the menu.
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
                  Explore the menu and place order without asking a menu.
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
                  Never forget to share the experience with your friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ................... */}
      {/* <!-- About 8 - Bootstrap Brain Component --> */}
      <section className="p-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-4 display-5 text-center">What We Offer</h2>
              <p className="text-secondary mb-5 text-center lead fs-4">We pride ourselves on recognising serious dineout problems and provide digital solutions for them.</p>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row gy-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 1col-lg-6 col-xxl-6">
              <div className="row justify-content-lg-end justify-content-xxl-around">
                <div className="col-12 col-lg-11 col-xxl-10">
                  <div className="card border-0 mb-4">
                    <div className="card-body p-0">
                      <h4 className="card-title mb-3">Our Infra & Services</h4>
                      <ul className="list-unstyled m-0 p-0 d-sm-flex flex-sm-wrap">
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>QR Code based Simplified Access to Menus</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Centralised Digital Menus</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Restaurants Lisiting</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card border-0 mb-4 mb-xxl-5">
                    <div className="card-body p-0">
                      <h4 className="card-title mb-3">Values We Add</h4>
                      <ul className="list-unstyled m-0 p-0 d-sm-flex flex-sm-wrap">
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Reduce unnecessary wait and queues</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>No need to share menu even with friends</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>No discussion with waiters</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Digital Experience</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Decide order in advance</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Easy to Share favourite restaurant or menu</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <a href="/" className="btn app-bg-color bsb-btn-2xl">
                    Explore
                    <FontAwesomeIcon className="pl-2" icon={faArrowRight} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
