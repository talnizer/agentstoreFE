import ShareDialog from "../ShareDialog";
import { useEffect, useState } from "react";

export default function ShareService(props) {

  const [openShareBox, setOpenShareBox] = useState(true);
  const [dialogParams, setDialogParams] = useState({
  });
  // console.log(props);
  useEffect(() => {
    setDialogParams(prevState => ({
      ...prevState,
      link: props?.link,
      description: props?.description
    }));
    setOpenShareBox(true);
  }, [props]);

  function handleConfirmationFromChild(confirmation) {
    setOpenShareBox(false);
  }

  return (
    <ShareDialog
      open={openShareBox}
      inputs={dialogParams}
      sendConfirmationToParent={handleConfirmationFromChild}
    ></ShareDialog>
  );
}
