import AuthUser from "../Common/AuthUser";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../routes/PathConstants";
import DashboardService from "../../Services/DashboardService";
import useService from "../../hooks/useService";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
    const navigate = useNavigate();

    const dashboardService = useService(DashboardService);

    useEffect(() => {
        getOverview();
    }, []);

    const getOverview = () => {
        console.log("getting overview");
    };


    return (
        <div className="contaniner">
            <div className="row justify-content-center">
                <div className="mt-2 px-2 col-10 col-md-8">
                    <div className="row">
                        <div className="mt-2 px-2 col d-flex justify-content-between">
                            <button className="btn btn-outline-dark" onClick={getOverview}>
                                {/* {loadingRide ? "Loading..." : "Reload"}
                                {loadingRide && (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                    ></span>
                                )} */}
                            </button>
                            {/* <button className="btn btn-outline-dark" onClick={createNewRide}>
                                New Ride
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
