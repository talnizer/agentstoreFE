import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FilterDialog from "../dialogs/FilterDialog";
import SortDialog from "../dialogs/SortDialog";
export default function SearchFilters(props) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  function handleChildSortByAction(sortBy) {
    props.sendSortByToParent(sortBy);
  }

  function handleChildFilterByAction(filterBy) {
    props.sendFilterByToParent(filterBy);
  }
  return (
    <div className="mb-4 container">
      <div className="row bg-dark">
        <div className="col-auto py-1">
          <div className="float-right">
            <SortDialog
              currentSortBy={props.currentSortBy}
              sortBy={handleChildSortByAction}
            ></SortDialog>
          </div>
          {/* <div className="float-right">
            <FilterDialog filterBy={handleChildFilterByAction}></FilterDialog>
          </div> */}
        </div>
      </div>
    </div>
  );
}
