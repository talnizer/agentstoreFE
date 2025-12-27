import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default function ShowPlanFeatures(props) {
  const [validated, setValidated] = useState(false);

  const [featuresInputs, setFeaturesInputs] = useState({});
  const [planFeaturesList, setPlanFeaturesList] = useState({});

  const [loading, setLoading] = useState(true);
  const adminService = useService(AdminService);

  useEffect(() => {
    fetchPlanFeatures(props.selectedPlan?._id);

  }, [props]);


  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    if (event.target.type === 'checkbox') {
      value = event.target.checked ? true : false;
    }


    setFeaturesInputs(values => ({ ...values, [name]: value }));
  };

  const handleUpdateFeatures = event => {
    setLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      updateFeatures();
    }

  }

  const updateFeatures = () => {
    adminService.updatePlanFeatures(props.selectedPlan?._id, { "features": featuresInputs }).subscribe({
      next: response => {
        if (response.status) {
          var updatedFeatures = response.result;
          if (updatedFeatures) {
            toast.dismiss();
            toast.success("Plan updated!");
            setPlanFeaturesList(updatedFeatures);
            resetPlanInputs(updatedFeatures);
            setLoading(false);
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

  const fetchPlanFeatures = (planId) => {
    setLoading(true);

    // setShowProfileEditFeatureForm(false);

    adminService.fetchPlanFeatures(
      planId
    ).subscribe({
      next: response => {
        console.log((response.result.current_page - 1) * response.result.per_page);
        setPlanFeaturesList(response.result);
        resetPlanInputs(response.result);
        setLoading(false);
      }
    });
  };

  const resetPlanInputs = (features) => {
    let newFeatures = [];
    setFeaturesInputs();
    features.forEach((element, index) => {
      let name = element.name;
      let value = element.value;
      let feature_id = element.feature_id;
      setFeaturesInputs(values => ({ ...values, [feature_id]: value }));
      // newFeatures[index] = { "name": name, "value": value, "feature_id": feature_id };
    });
    console.log(newFeatures);
    // setFeaturesInputs(newFeatures);
  }
  const detachFeature = (feature) => {
    setLoading(true);

    // setShowProfileEditFeatureForm(false);

    adminService.detachFeatureFromPlan(
      props.selectedPlan?._id, { 'feature_id': feature.feature_id }
    ).subscribe({
      next: response => {
        console.log((response.result.current_page - 1) * response.result.per_page);
        setPlanFeaturesList(response.result);
        resetPlanInputs(response.result);
        setLoading(false);
      }
    });
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
      {!loading &&
        <Form
          validated={validated}
          onSubmit={handleUpdateFeatures}
          noValidate
        >
          {planFeaturesList && planFeaturesList.map((feature, index) => {
            // let type = feature.value_type === 'integer' ? 'number' : 'checkbox';
            let featureId = feature.feature_id;
            return (
              <div key={index} className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-8 text-left">
                  <label
                    className="text-left text-break form-check-label"
                    data-mdb-ripple-init
                    htmlFor="flexRadioDefault1"
                  >
                    {feature.name}
                  </label>
                </div>
                <div className="text-center col-2">
                  <div className="form-group mt-3">
                    {//feature?.feature_detail?.value_type === 'boolean' 
                      feature?.feature_detail?.value_type !== 'integer'
                      &&
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type='checkbox'
                          value={featuresInputs[featureId] ? true : false}
                          name={feature.feature_id}
                          id={index}
                          checked={featuresInputs[featureId]}
                          onChange={handleChange}
                        />

                      </div>}
                    {
                      feature?.feature_detail?.value_type === 'integer'
                      &&
                      <div className="form-outline mb-4">
                        <input
                          className="form-control form-control-lg"
                          type='number'
                          value={featuresInputs[feature.feature_id]}
                          name={feature.feature_id}
                          id={index}
                          onChange={handleChange}
                        />

                      </div>}
                  </div>
                </div>
                <div className="col-2">
                  <div className="btn btn-outline-primary"
                    onClick={() => detachFeature(feature)}>Detach</div>
                </div>
              </div>
            );
          })}
          {planFeaturesList &&
            <input className="bg-dark text-white mt-3 col btn btn-primary" type="submit" />
          }

        </Form>}
    </>

  );
}
