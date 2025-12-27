import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import ShowSelectedPlanFeatures from "./ShowSelectedPlanFeatures";

export default function ShowSubscriptionDetail(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [props]);

  return (

    <>
      {loading && (
        <div className="my-5 text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <ShowSelectedPlanFeatures selectedPlan={props.selectedSubscription?.plan}></ShowSelectedPlanFeatures>
    </>

  );
}
