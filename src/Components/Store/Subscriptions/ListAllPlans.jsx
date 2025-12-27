import { useEffect, useState } from "react";

import useService from "../../../hooks/useService";
import AdminService from "../../../Services/AdminService";
import ShowSelectedPlanFeatures from "./ShowSelectedPlanFeatures";
import SubscribeToAPlan from "./SubscribeToAPlan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faIndianRupee } from "@fortawesome/free-solid-svg-icons";

export default function ListAllPlans() {
  const [plansList, setPlansList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSelectedPlanDetails, setShowSelectedPlanDetails] = useState(false);
  const [showSubscribeToAPlan, setShowSubscribeToAPlan] = useState(false);

  const [length, setLength] = useState(0);
  const [result, setResult] = useState({});
  const adminService = useService(AdminService);
  const FIRST_PAGE = 1;
  useEffect(() => {
    fetchPlans(FIRST_PAGE);
  }, []);

  const fetchPlans = (selectedPage) => {
    setLoading(true);
    setShowSelectedPlanDetails(false);
    adminService.fetchPlans(
      {
        page: selectedPage,
      }
    ).subscribe({
      next: response => {

        setResult(response.result);
        setLength(((response.result.current_page - 1) * response.result.per_page) + 0);
        console.log((response.result.current_page - 1) * response.result.per_page);
        setPlansList(response.result?.data);
        setLoading(false);
      }
    });
  };


  const subscribePlan = (plan) => {
    reinitShowFlags();
    setSelectedPlan(plan);
    setShowSubscribeToAPlan(true);
  }

  const showPlanDetail = (plan) => {
    if (selectedPlan && selectedPlan._id === plan._id) {
      setSelectedPlan();
    } else {
      setSelectedPlan(plan);
      // reinitShowFlags();
      // setShowSelectedPlanDetails(true);
    }

  }

  const reinitShowFlags = () => {
    setShowSelectedPlanDetails(false);
    setShowSubscribeToAPlan(false);
  }

  function handleResponseFromChild(currentPage) {
    setCurrentPage(currentPage);
    fetchPlans(currentPage);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mt-2 px-0">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={() => fetchPlans(FIRST_PAGE)}
          >
            Reload
          </button>
          {loading && (
            <div className="my-5 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {!loading &&
            <div className="d-flex justify-content-center">

              <div className="col-12 col-md-10 col-lg-8">
                {/* <tbody> */}
                {plansList && plansList.map((plan, len = 0) => {
                  return (
                    <>
                      <div class="card border-primary mb-4">
                        <div class="card-header text-center bg-primary text-white">
                          <h3>{plan.name}</h3>
                        </div>
                        <div class="card-body text-center">
                          <div className="text-center text-capitalize">{plan.description}</div>
                          <h4 class="card-title text-center">
                            <FontAwesomeIcon size="xs" className="px-1" icon={faIndianRupee} />
                            {plan.price}/mo</h4>
                          {<div className="my-2 btn btn-outline-primary mx-2" onClick={() => showPlanDetail(plan)}>
                            Detail <FontAwesomeIcon size="xl" className="px-1" icon={showSelectedPlanDetails ? faAngleLeft : faAngleDown} /></div>}
                          {selectedPlan && selectedPlan._id === plan._id &&
                            <ShowSelectedPlanFeatures selectedPlan={selectedPlan}></ShowSelectedPlanFeatures>
                          }
                          {/* <div class="row 1d-grid"> */}
                          {/* <a href="#" class="btn btn-outline-primary">Choose Plan</a> */}

                          {<div className="col btn btn-outline-primary mx-2" onClick={() => subscribePlan(plan)}>Subscribe</div>}
                          {/* </div> */}
                        </div></div>
                    </>
                    // show selected plan features here by a new component
                  )
                })
                }
              </div>
              {/* </table> */}
              {/* Pagination Here*/}
              {/* <Pagination
                result={result}
                getData={handleResponseFromChild}
              ></Pagination> */}
              {/* End pagination */}
            </div>
          }
          {showSubscribeToAPlan &&
            <SubscribeToAPlan selectedPlan={selectedPlan} />
          }
        </div>
      </div>
    </div>
  );
}
