import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import AdminService from "../../Services/AdminService";
import Pagination from "../Common/Pagination";
import PlanStatuses from "../../constants/PlanStatuses";
import ShowPlanDetail from "./ShowPlanDetail";

export default function PlansPenal() {
  const [plansList, setPlansList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditPlanForm, setShowEditPlanForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [length, setLength] = useState(0);
  const [result, setResult] = useState({});
  const adminService = useService(AdminService);
  const FIRST_PAGE = 1;
  useEffect(() => {
    fetchPlans(FIRST_PAGE);
  }, []);

  const fetchPlans = (selectedPage) => {
    setLoading(true);
    setShowEditPlanForm(false);
    // setShowProfileEditPlanForm(false);

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

  const addPlan = () => {
    setSelectedPlan();
    reinitShowFlags();
    setShowEditPlanForm(true);
  }

  const showPlanDetail = (plan) => {
    if (showEditPlanForm) {
      setShowEditPlanForm(false);
    } else {
      setSelectedPlan(plan);
      reinitShowFlags();
      setShowEditPlanForm(true);
    }

  }

  const reinitShowFlags = () => {
    setShowEditPlanForm(false);
  }

  function handleResponseFromChild(currentPage) {
    setCurrentPage(currentPage);
    fetchPlans(currentPage);
  }
  function handleResetShowEditPlanForm(value) {
    fetchPlans(currentPage);
    setShowEditPlanForm(value);
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
          <button
            className="m-2 btn btn-outline-dark"
            onClick={() => addPlan()}
          >
            Add New
          </button>
          {loading && (
            <div className="my-5 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {!loading &&
            <div className="table-responsive">

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S. No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price (INR)</th>
                    <th scope="col">Duration (Months)</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plansList && plansList.map((plan, len = 0) => {
                    return (

                      <tr key={len + 1 + length}>
                        <th scope="row">{len + 1 + length}</th>
                        <td>{plan.name}</td>
                        <td>{plan.description}</td>
                        <td>{plan.price}</td>
                        <td>{plan.duration}</td>
                        <td>{PlanStatuses.values[plan.status]}</td>
                        <td>{new Date(
                          parseInt(plan.created_at)
                        ).toDateString()}
                        </td>
                        <td>
                          {/* {plan.status ? plan.status : UserStatuses.statuses.ACTIVE} */}
                          {<div className="btn btn-sm btn-primary my-1" onClick={() => showPlanDetail(plan)}>Detail</div>}
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
              {/* Pagination Here*/}
              <Pagination
                result={result}
                getData={handleResponseFromChild}
              ></Pagination>
              {/* End pagination */}
            </div>
          }
        </div>
      </div>

      {showEditPlanForm &&
        <ShowPlanDetail showEditPlanForm={showEditPlanForm}
          resetShowEditPlanForm={handleResetShowEditPlanForm} selectedPlan={selectedPlan} />
      }
    </div>
  );
}
