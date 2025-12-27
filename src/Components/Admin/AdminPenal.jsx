import { useEffect, useState } from "react";

import UsersPenal from "./UsersPenal";
import LocationsPenal from "./LocationsPenal";
import StoresPenal from "./StoresPenal";
import PlansPenal from "./PlansPenal";

export default function AdminPenal() {

  const LOCATION = 'location', USERS = 'users', STORES = 'stores',
    PLANS = 'plans', FEATURES = 'features';
  const [activeTab, setActiveTab] = useState(USERS);

  useEffect(() => {

  }, []);

  const showLocations = () => {
    setActiveTab(LOCATION);
  };

  const showUsers = () => {
    setActiveTab(USERS);
  };

  const showStores = () => {
    setActiveTab(STORES);
  };

  const showPlans = () => {
    setActiveTab(PLANS);
  };

  const showFeatures = () => {
    setActiveTab(FEATURES);
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mt-2 px-0 col-md-11 ">
          <div className="mt-5 container">
            <ul className="1px-2 row nav nav-tabs nav-fill border-none">
              <li id={LOCATION} className="px-0 mx-0 col-auto nav-item">
                <a
                  className={
                    activeTab === LOCATION
                      ? "border-0 nav-link active app-bg-color"
                      : "bg-dark border border-bottom-0 text-white nav-link"
                  }
                  onClick={showLocations}
                  href="#"
                >
                  Locations
                </a>
              </li>
              <li id={USERS} className="px-0 mx-0 col-auto nav-item">
                <a
                  className={
                    activeTab === USERS
                      ? "border-0 nav-link active app-bg-color"
                      : "bg-dark border border-bottom-0 text-white nav-link"
                  }
                  onClick={showUsers}
                  href="#"
                >
                  User
                </a>
              </li>
              <li id={STORES} className="px-0 mx-0 col-auto nav-item">
                <a
                  className={
                    activeTab === STORES
                      ? "border-0 nav-link active app-bg-color"
                      : "bg-dark border border-bottom-0 text-white nav-link"
                  }
                  onClick={showStores}
                  href="#"
                >
                  Stores
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
                  Plans
                </a>
              </li>
              <li id={FEATURES} className="px-0 mx-0 col-auto nav-item">
                <a
                  className={
                    activeTab === FEATURES
                      ? "border-0 nav-link active app-bg-color"
                      : "bg-dark border border-bottom-0 text-white nav-link"
                  }
                  onClick={showFeatures}
                  href="#"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>
          {activeTab === LOCATION
            && false &&
            <LocationsPenal></LocationsPenal>
          }
          {activeTab === USERS &&
            <UsersPenal></UsersPenal>
          }
          {activeTab === STORES &&
            <StoresPenal></StoresPenal>
          }
          {activeTab === PLANS &&
            <PlansPenal></PlansPenal>
          }
          {/* {activeTab === FEATURES &&
            <FeaturesPenal></FeaturesPenal>
          } */}
        </div>
      </div>

    </div>
  );
}
