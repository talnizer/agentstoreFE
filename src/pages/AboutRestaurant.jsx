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
import PathConstants from "../routes/PathConstants";
import { useNavigate } from "react-router-dom";

export default function AboutRestaurant() {
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate(PathConstants.ABOUT);
  }
  return (
    <>
      {/* ........................ */}
      {/* <!-- About 1 - Bootstrap Brain Component --> */}
      <section>
        <div className="mt-4 container px-3">
          <div className="text-right"><div className="btn app-bg-color" onClick={goToAbout}>Customer? Click Here</div></div>
          <h1 className="text-center app-text-color display-3 fw-bold">About Us</h1>
        </div>
      </section>
      <section className="py-3 py-md-5 px-3">
        <div className="container">
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 1col-lg-6 1col-xl-7">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-11 text-center">
                  <p className="h4 mb-2">Why to spend on Menu when it's in everyone's phone?
                  </p>
                  <p className="lead fs-5 text-secondary mb-5">
                    Welcome to HamRahi. Your trusted partner in smart, handy, fast, and cost-effective Restaurant Ordering solutions.
                    We provide tech solutions to Restaurants by providing them online identity and enabling access to Menus via QR Code. We reduce cost involved in Menu management and efforts in ordering food.
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
                            <h2 className="h4 mb-3">Restaurant Optimization</h2>
                            <p className="text-secondary mb-0">Upload restaurant Menu and let customers have hassle free unique and simplified digital experience. Faster order placing, faster table rotation. No printing. No additional device. Customer will use just their Phones.</p>
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
      <section id="about-section" className="py-5 bg-light px-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Our Vision</h3>
              <p>It's simple
                <ul> <li> To optimise restaurant's orders management. Increase number of orders and provide speedy & hussle free experience to their customers.
                </li>
                  <li>To enable digital control and monitoring of restaurant.</li></ul></p>
            </div>
            <div className="col-md-6">
              <h3>Our Mission</h3>
              <p>To build a robust infra for restaurants and make it pan-India one stop solution for restaurant.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="py-4 bg-white border1 1border-top 1border-dark container-fluid justify-content-center text-center mb-41">
        <div className="row">
          <h1 className="mt-3 app-text-color fw-bold">How it Works</h1>
        </div>
        <div className="row 1bg-light mx-2 py-4 rounded"><div className="row 1col-xxl-7">
          {/* <span className="text-dark">Steps</span> */}

          <p className="lead">
            Upload your menu and get QR Code with Brand Name and Logo. Share it OR downlaod and paste it anywhere. Let your customers scan and see the menu. Add-on : Get social sharable restaurant/store profile.
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
                  Register & Create a Social Sharable Profile
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
                  Take a snap of existing Menu and Upload the images.
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
                  Once done, find Menu QR Code in your Dashboard (below Menu). Paste it anywhere or share across.
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
                  Let People scan it, explore the Menu and place the Order.
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
              <p className="text-secondary mb-5 text-center lead fs-4">We pride ourselves on providing top-notch digital infrastructure and solutions for restaurants and stores to aid their business.</p>
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
                          <span>Restaurant Public Profile with services listing</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Digital Menu</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Downloadable and reusable Menu QR Code</span>
                        </li>
                        {/* <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Auto Notification System</span>
                        </li> */}
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Single Sharable Link for Profile and Menu</span>
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
                          <span>Online Visibility</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Speedy Table Turn</span>
                        </li><li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>No need to run to distribute and explain Menus</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Reduce Customer Time and Efforts</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Increase Order & Scale Business</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Simplified Order Placing</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Save Cost of Physical Infra</span>
                        </li>
                        <li className="py-1 d-flex align-items-center gap-2 col-sm-6">
                          <FontAwesomeIcon className="app-text-color" icon={faCheckCircle} />
                          <span>Use Menu as brand building agent. Share across.</span>
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
