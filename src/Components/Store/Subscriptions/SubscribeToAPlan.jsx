import { useEffect, useState } from "react";
import useService from "../../../hooks/useService";
import { toast } from "react-toastify";
import UserSubscriptionService from "../../../Services/UserSubscriptionService";

export default function SubscribeToAPlan(props) {
    const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const [dialogParams, setDialogParams] = useState({
    });
    const userSubscriptionService = useService(UserSubscriptionService);

    useEffect(() => {
    }, [props]);

    const setFeedbackParams = () => {
        setDialogParams({
            // text: null,
            storeUserId: props.userId,
        });

        setOpenFeedbackDialog(true);
    }

    function handleConfirmationFromChild(confirmation, result) {
        if (confirmation) {
            // alert(result);
        }
        setOpenFeedbackDialog(false);
    }

    const subscribePlan = () => {
        setLoading(true);
        // setShowPlanDetails(false);
        userSubscriptionService.subscribe(props.selectedPlan._id,
            {

            }
        ).subscribe({
            next: response => {
                setResult(response.result);
                setLoading(false);
                toast.success(response.message);
            }
        });
    };

    return (
        <>
            {props.selectedPlan?.name}
            {<div className="btn btn-sm btn-primary my-1" onClick={() => subscribePlan()}>Subscribe</div>}
        </>
    );
}
