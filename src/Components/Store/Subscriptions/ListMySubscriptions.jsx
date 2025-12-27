import { useEffect, useState } from "react";

import UserSubscriptionService from "../../../Services/UserSubscriptionService";
import ShowSubscriptionDetail from "./ShowSubscriptionDetail";
import useService from "../../../hooks/useService";
import Pagination from "../../Common/Pagination";

export default function ListMySubscriptions() {
  const [subscriptionsList, setSubscriptionsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);

  const [length, setLength] = useState(0);
  const [result, setResult] = useState({});
  const userSubscriptionService = useService(UserSubscriptionService);
  const FIRST_PAGE = 1;
  useEffect(() => {
    fetchSubscriptions(FIRST_PAGE);
  }, []);

  const fetchSubscriptions = (selectedPage) => {
    setLoading(true);
    setShowSubscriptionDetails(false);
    userSubscriptionService.fetchSubscriptions(
      {
        page: selectedPage,
      }
    ).subscribe({
      next: response => {

        setResult(response.result);
        setLength(((response.result.current_page - 1) * response.result.per_page) + 0);
        console.log((response.result.current_page - 1) * response.result.per_page);
        setSubscriptionsList(response.result?.data);
        setLoading(false);
      }
    });
  };


  const showSubscriptionDetail = (subscription) => {
    if (selectedSubscription?._id === subscription._id) {
      setSelectedSubscription();
    } else {
      setSelectedSubscription(subscription);
    }

  }

  const reinitShowFlags = () => {
    setShowSubscriptionDetails(false);
  }

  function handleResponseFromChild(currentPage) {
    setCurrentPage(currentPage);
    fetchSubscriptions(currentPage);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mt-2 px-0">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={() => fetchSubscriptions(FIRST_PAGE)}
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
            <div className="table-responsive">

              <table className="table">
                {/* <thead>
                  <tr>
                    <th scope="col">S. No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead> */}
                <tbody>
                  {subscriptionsList && subscriptionsList.map((subscription, len = 0) => {
                    return (
                      <>
                        {/* <!-- Subscription Card --> */}
                        <div class="col my-3">
                          <div class="card h-100">
                            <div class="card-body">
                              <div className="text-right">
                                <div className="btn btn-sm btn-primary my-1" onClick={() => showSubscriptionDetail(subscription)}>Detail</div>
                              </div>

                              <h5 class="card-title">Plan : {subscription.plan?.name}</h5>
                              <p class="card-text text-muted">{subscription.plan?.description}</p>
                              <p class="card-text"><strong>Status:</strong> {subscription.active ? 'ACTIVE' : 'EXPIRED'}</p>
                              <p class="card-text"><strong>Subscribed On: </strong>
                                {new Date(parseInt(subscription.created_at)).toDateString()}</p>

                              <p class="card-text"><strong>Expires On: </strong>
                                {new Date(parseInt(subscription.ends_at)).toDateString()}</p>
                              {
                                selectedSubscription && selectedSubscription._id === subscription._id &&
                                <div className="mt-5 mb-0">
                                  <p className="card-text"><strong>Features</strong></p>
                                  <div className="card-text">
                                    <ShowSubscriptionDetail selectedSubscription={selectedSubscription}></ShowSubscriptionDetail>
                                  </div>
                                </div>
                              }

                            </div>
                            <div class="card-footer text-end">
                              <button class="btn btn-danger btn-sm">Cancel</button>
                            </div>
                          </div>
                        </div >
                        {/* <tr key={len + 1 + length}>
                          <th scope="row">{len + 1 + length}</th>
                          <td>{subscription.user_id}</td>
                          <td>{subscription.plan_id}</td>
                          <td>{subscription.active}</td>
                          <td>{new Date(
                            parseInt(subscription.created_at)
                          ).toDateString()}
                          </td>
                          <td>
                            {<div className="btn btn-sm btn-primary my-1" onClick={() => showSubscriptionDetail(subscription)}>Detail</div>}
                          </td>
                        </tr> */}

                      </>
                      // show selected subscription features here by a new component
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
    </div >
  );
}
