import { faBoltLightning, faDatabase, faEdit, faHandPointer, faIndianRupee, faPeopleLine, faPhone, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WhyWe() {
  return (
    <section id="services" className="text-center my-5 bg-dark 1border border-dark rounded-5">
      {/* <hr /> */}
      <h2 className="text-white font-weight-bold display-6 py-3">Why We?</h2>
      <div className="row justify-content-center">

        <div className="shadow bg-light p-4 m-3 col-8 col-md-5 feature border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color ">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faIndianRupee}
              />
              <h5 className="h3 card-title text-right 1app-text-color pb-2">Lowest Price</h5>
              <hr />
              <p className="pt-3 card-text">
                Lowest price compared to competitiors. Starting at just Rs. 99/mo/feature.
              </p>
            </div>
            {/* <hr /> */}
          </div>

        </div>
        <div className="shadow bg-light p-4 m-3 col-8 col-md-5 feature border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color ">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faBoltLightning}
              />
              <h5 className="h3 card-title text-left 1app-text-color pb-2">Instant Menu</h5>
              <hr />
              <p className="pt-3 card-text">
                No wait. Scan the Code - get the menu - place the order
              </p>
            </div>
            {/* <hr /> */}
          </div>

        </div>

        <div className="shadow bg-light p-4 m-3 col-8 col-md-5  border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color ">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faPhone}
              /><h5 className="h3 card-title text-right 1app-text-color pb-2">Phone Access</h5>

              <hr />
              <p className="py-3 card-text">
                No Paper. Use phone for menu and place order.
              </p>
            </div>
            {/* <hr /> */}
          </div>
        </div>
        <div className="shadow bg-light p-4 m-3 col-8 col-md-5  border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color ">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faPeopleLine}
              />
              <h5 className="h3 card-title text-left 1app-text-color pb-2">No Queue</h5>
              <hr />
              <p className="py-3 card-text">
                No wait in the queue while others decide their own orders
              </p>
            </div>
          </div>
        </div>
        <div className="shadow bg-light p-4 m-3 col-8 col-md-5  border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faHandPointer}
              />
              <h5 className="h3 card-title text-right 1app-text-color pb-2">Ease of Access</h5>
              <hr />
              <p className="py-3 card-text">
                Can be shared anywhere. Let all friends access on own screen.
              </p>
            </div>
          </div>
        </div>
        <div className="shadow bg-light p-4 m-3 col-8 col-md-5  border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faEdit}
              />
              <h5 className="h3 card-title text-left 1app-text-color pb-2">Realtime Menu Update</h5>
              <hr />
              <p className="py-3 card-text">
                Update dish detail and dish availability at anytime
              </p>
            </div>
          </div>
        </div>
        <div className="shadow bg-light p-4 m-3 col-8 col-md-5  border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color ">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faThumbsUp}
              />
              <h5 className="h3 card-title text-right 1app-text-color pb-2">Realtime Feedback</h5>
              <hr />
              <p className="py-3 card-text">
                Get guests feedback privately and effortlessly.
              </p>
            </div>
          </div>
        </div>
        <div className="shadow bg-light p-4 m-3 col-8 col-md-5  border rounded-3">
          <div className="text-dark 1shadow 1card 1app-bg-color ">
            <div className="px-2 card-body">
              <FontAwesomeIcon size="2x"
                className="mb-3 app-text-color px-1"
                icon={faDatabase}
              />
              <h5 className="h3 card-title text-left 1app-text-color pb-2">Guest Data - Scale Business</h5>
              <hr />
              <p className="py-3 card-text">
                Build loyalty using data and make business strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
