import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import ShowPlanFeatures from "./ShowPlanFeatures";
import PlanEdit from "./PlanEdit";
import AddPlanFeatures from "./AddPlanFeatures";

export default function ShowPlanDetail(props) {
  const PLAN = 'P', FEATURES = 'F', ATTACH_FEATURES = 'A';
  const [validated, setValidated] = useState(false);
  const [showEditPlanForm, setShowEditPlanForm] = useState(props.showEditPlanForm);
  const [planInputs, setPlanInputs] = useState({});
  const [selectedPlanId, setSelectedPlanId] = useState();

  const [activeTab, setActiveTab] = useState(PLAN);
  const adminService = useService(AdminService);

  useEffect(() => {
    setPlanInputs(props.selectedPlan);
    setSelectedPlanId(props.selectedPlan?._id);
    setShowEditPlanForm(props.showEditPlanForm);
  }, [props]);


  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    setPlanInputs(values => ({ ...values, [name]: value }));
  };

  const addOrUpdatePlan = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      if (props.selectedPlan) {
        updatePlan();
      } else {
        addPlan();
      }
    }

  }

  const addPlan = () => {
    adminService.addPlan(planInputs).subscribe({
      next: response => {
        if (response.status) {
          var plan = response.result;
          if (plan) {
            toast.dismiss();
            toast.success("Plan updated!");
            setShowEditPlanForm(false);
            props.resetShowEditPlanForm(false);
          }
        }
      },
      error: e => {
        toast.dismiss();
        toast.error(e.message);
      },
      complete: () => { },
    });
  }
  const updatePlan = () => {
    adminService.editPlan(selectedPlanId, planInputs).subscribe({
      next: response => {
        if (response.status) {
          var plan = response.result;
          if (plan) {
            toast.dismiss();
            toast.success("Plan updated!");
            setShowEditPlanForm(false);
            props.resetShowEditPlanForm(false);
          }
        }
      },
      error: e => {
        toast.dismiss();
        toast.error(e.message);
      },
      complete: () => { },
    });
  };
  // const setActiveTab = () => {
  //   setShowPlan(!showPlan);
  // }
  return (

    <div className="container">
      {showEditPlanForm &&
        <div className="row justify-content-center">
          <div className="mb-4 mt-2 px-0 col-12 col-lg-10 ">
            <button
              className={"m-2 btn " + (activeTab === PLAN ? 'btn-dark' : "btn-outline-dark")}
              onClick={() => setActiveTab(PLAN)}
            >
              Plan
            </button>
            <button
              className={"m-2 btn " + (activeTab === FEATURES ? 'btn-dark' : "btn-outline-dark")}
              onClick={() => setActiveTab(FEATURES)}
            >
              Plan Features
            </button>
            <button
              className={"m-2 btn " + (activeTab === ATTACH_FEATURES ? 'btn-dark' : "btn-outline-dark")}
              onClick={() => setActiveTab(ATTACH_FEATURES)}
            >
              Attach Feature
            </button>
            {activeTab === PLAN &&
              <PlanEdit selectedPlan={props.selectedPlan} />
            }
            {activeTab === FEATURES &&
              <ShowPlanFeatures
                // props
                selectedPlan={props.selectedPlan}
              />
            }
            {activeTab === ATTACH_FEATURES &&
              <AddPlanFeatures
                // props
                showEditPlanForm={showEditPlanForm} selectedPlan={props.selectedPlan}
              />
            }
          </div>
        </div>
      }</div>
  );
}
