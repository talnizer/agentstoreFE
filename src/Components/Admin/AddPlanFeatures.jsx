import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default function AddPlanFeatures(props) {
  const [validated, setValidated] = useState(false);
  const [showEditPlanForm, setShowEditPlanForm] = useState(props.showEditPlanForm);
  const [selectedPlanId, setSelectedPlanId] = useState();
  const [loading, setLoading] = useState();
  const [features, setFeatures] = useState();
  const [featureInputs, setFeatureInputs] = useState({});
  const [selectedFeature, setSelectedFeature] = useState();
  const adminService = useService(AdminService);

  useEffect(() => {
    // setFeaturesInputs(props.selectedPlan);
    setSelectedPlanId(props.selectedPlan?._id);
    fetchAllFeatures();
  }, [props]);

  const fetchAllFeatures = () => {
    setLoading(true);
    adminService.fetchFeatures(
      {}
    ).subscribe({
      next: response => {

        setFeatures(response.result?.data);
        setLoading(false);
      }
    });
  };

  const handleFeatureInputChange = event => {

    if (event.target.name === 'id') {
      features.forEach((feature, index) => {
        if (feature._id === event.target.value) {
          setSelectedFeature(feature);
          return false;
        }
      });
    }
    const name = event.target.name;
    var value = event.target.value;
    setFeatureInputs(values => ({ ...values, [name]: value }));
  };

  const attachFeature = event => {
    setLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      adminService.attachFeatureToPlan(selectedPlanId, featureInputs).subscribe({
        next: response => {
          if (response.status) {
            var plan = response.result;
            if (plan) {
              toast.dismiss();
              toast.success("Plan updated!");
              setShowEditPlanForm(false);
              setLoading(false);
              // props.resetShowEditPlanForm(false);
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

  }
  return (

    <>
      {loading && (
        <div className="my-5 text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {!loading && <Form
        validated={validated}
        onSubmit={attachFeature}
        noValidate
      >
        <>
          <Form.Select
            className="text-capitalize form-select form-select-lg is-1invalid"
            aria-label="Default select example"
            id="id"
            name="id"
            value={featureInputs?.id || ""}
            // onChange={handleSelectChangeDriver}
            onChange={handleFeatureInputChange}
            required
          >
            <option disabled value={""}>
              Select Feature
            </option>
            {features?.length > 0 &&
              features.map((feature, index) => {
                return (
                  <option key={index} value={feature._id}>
                    {feature.name}
                  </option>
                );
              })}

          </Form.Select>
          {//feature?.feature_detail?.value_type === 'boolean' 
            selectedFeature && selectedFeature.value_type !== 'integer'
            &&
            <div className="form-check">
              <input
                className="form-check-input"
                type='checkbox'
                value={featureInputs?.value || true}
                name='value'
                placeholder="Value"
                onChange={handleFeatureInputChange}
                checked={featureInputs?.value || true} //default
              // disabled={true}
              />

            </div>}
          {
            selectedFeature && selectedFeature?.value_type === 'integer'
            &&
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                // row={3}
                id="value"
                name="value"
                className="form-control form-control-lg"
                placeholder="Value"
                onChange={handleFeatureInputChange}
                value={featureInputs?.value || ""}
                // onChange={handleChange}
                required
              // disabled={true}
              />
            </div>}
          <input className="bg-dark text-white mt-3 col btn btn-primary" type="submit" />
        </>
        {/* )})} */}
      </Form>}
    </>

  );
}
