import { useEffect, useState } from "react";
import AuthUser from "../../Common/AuthUser";
import ListMySubscriptions from "./ListMySubscriptions";
import ListAllPlans from "./ListAllPlans";


export default function SubscriptionsDashboard(props) {
  const { user } = AuthUser();
  const SUBSCRIPTIONS = 'subscriptions',
    PLANS = 'plans';
  const [activeTab, setActiveTab] = useState(SUBSCRIPTIONS);

  useEffect(() => {

  }, []);

  const showSubscriptions = () => {
    setActiveTab(SUBSCRIPTIONS);
  };

  const showPlans = () => {
    setActiveTab(PLANS);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mt-2 px-0 col-md-11 ">
          <div className="mt-5 container">
            <ul className="1px-2 row nav nav-tabs nav-fill border-none">
              <li id={SUBSCRIPTIONS} className="px-0 mx-0 col-auto nav-item">
                <a
                  className={
                    activeTab === SUBSCRIPTIONS
                      ? "border-0 nav-link active app-bg-color"
                      : "bg-dark border border-bottom-0 text-white nav-link"
                  }
                  onClick={showSubscriptions}
                  href="#"
                >
                  My Subscriptions
                </a>
              </li>
              <li id={PLANS} className="px-0 mx-0 col-auto nav-item">
                <a
                  className={
                    activeTab === PLANS
                      ? "border-0 nav-link active app-bg-color"
                      : "bg-dark border border-bottom-0 text-white nav-link"
                  }
                  onClick={showPlans}
                  href="#"
                >
                  All Plans
                </a>
              </li>
            </ul>
          </div>
          {activeTab === SUBSCRIPTIONS
            &&
            <ListMySubscriptions />
          }
          {activeTab === PLANS &&
            <ListAllPlans />
          }
        </div>
      </div>

    </div>
  );
}
