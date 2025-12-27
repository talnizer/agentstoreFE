import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import PlanStatuses from "../../constants/PlanStatuses";

export default function PlanEdit(props) {
  const [validated, setValidated] = useState(false);
  const [planInputs, setPlanInputs] = useState(props.selectedPlan);
  const [selectedPlanId, setSelectedPlanId] = useState();
  const [loading, setLoading] = useState(false);

  const adminService = useService(AdminService);

  useEffect(() => {
    setPlanInputs(props.selectedPlan);
    setSelectedPlanId(props.selectedPlan?._id);
  }, [props]);

  //TODO: fetchPlanById

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
      setLoading(true);
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
            setPlanInputs(plan);
          }
        }
      },
      error: e => {
        toast.dismiss();
        toast.error(e.message);
      },
      complete: () => { setLoading(false); },
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
            setPlanInputs(plan);
          }
        }
      },
      error: e => {
        toast.dismiss();
        toast.error(e.message);
      },
      complete: () => { setLoading(false); },
    });
  };

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="mb-4 mt-2 px-0 col-10 col-md-8 ">
          {loading && (
            <div className="my-5 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {!loading && <Form
            validated={validated}
            onSubmit={addOrUpdatePlan}
            noValidate
          >
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control form-control-lg"
                placeholder="Name"
                value={planInputs?.name || ""}
                onChange={handleChange}
                required
                disabled={props.selectedPlan ? true : false}
              />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <textarea
                type="text"
                row={3}
                id="description"
                name="description"
                className="form-control form-control-lg"
                placeholder="Description"
                onChange={handleChange}
                value={planInputs?.description || ""}
                // onChange={handleChange}
                required
              // disabled={true}
              />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="integer"
                id="price"
                name="price"
                className="form-control form-control-lg"
                placeholder="Price in INR"
                value={planInputs?.price || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="integer"
                id="duration"
                name="duration"
                className="form-control form-control-lg"
                placeholder="Duration in Months"
                value={planInputs?.duration || ""}
                onChange={handleChange}
                required
              />
            </div>
            <Form.Select
              className="text-capitalize form-select form-select-lg is-1invalid"
              aria-label="Default select example"
              id="status"
              name="status"
              value={planInputs?.status || ""}
              // onChange={handleSelectChangeDriver}
              onChange={handleChange}
              required
            >
              <option disabled value={""}>
                Status
              </option>
              {PlanStatuses.statuses &&
                Object.keys(PlanStatuses.statuses).map((key, index) => {
                  return (
                    <option key={index} value={PlanStatuses.statuses[key]}>
                      {key}
                    </option>
                  );
                })}
            </Form.Select>
            <input className="bg-dark text-white mt-3 col btn btn-primary" type="submit" />
          </Form>}
        </div>
      </div></div>
  );
}
