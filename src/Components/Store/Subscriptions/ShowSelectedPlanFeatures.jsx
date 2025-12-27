import { useEffect, useState } from "react";

import UserSubscriptionService from "../../../Services/UserSubscriptionService";
import useService from "../../../hooks/useService";

export default function ShowSelectedPlanFeatures(props) {
  const [planFeaturesList, setPlanFeaturesList] = useState();

  const [loading, setLoading] = useState(false);
  const userSubscriptionService = useService(UserSubscriptionService);

  useEffect(() => {
    fetchPlanFeatures(props.selectedPlan?._id);
  }, [props]);

  const fetchPlanFeatures = (planId) => {
    setLoading(true);

    userSubscriptionService.fetchPlanFeatures(
      planId
    ).subscribe({
      next: response => {
        console.log((response.result.current_page - 1) * response.result.per_page);
        setPlanFeaturesList(response.result);
        setLoading(false);
      }
    });
  };

  return (

    <>
      {loading && (
        <div className="my-5 text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!loading &&
        planFeaturesList && planFeaturesList.map((feature, index) => {
          // let type = feature.value_type === 'integer' ? 'number' : 'checkbox';
          let featureId = feature.feature_id;
          return (
            <div key={index} className="mx-5 row d-flex justify-content-center align-items-center">
              <div className="1ml-2 col-8 text-left">
                <label
                  className="text-break form-check-label"
                  data-mdb-ripple-init
                  htmlFor="flexRadioDefault1"
                >
                  {feature.feature_detail?.title ? feature.feature_detail.title : feature.name}
                </label>
              </div>
              <div className="col-4">
                <div className="form-group mt-3">
                  {//feature?.feature_detail?.value_type === 'boolean' 
                    feature?.feature_detail?.value_type !== 'integer'
                    &&
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type='checkbox'
                        // value={planFeaturesList[featureId] ? true : false}
                        // name={planFeaturesList.feature_id}

                        checked={feature.value}
                        disabled={true}
                      />

                    </div>}
                  {
                    feature?.feature_detail?.value_type === 'integer'
                    &&
                    <div className="form-outline mb-4">
                      <span>{feature?.value}</span>
                    </div>}
                </div>
              </div>
            </div>
          );
        })
      }
    </>

  );
}
