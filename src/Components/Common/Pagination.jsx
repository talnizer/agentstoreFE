import { useState, useEffect } from "react";
export default function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(props.result?.current_page);
  const [lastPage, setLastPage] = useState(props.result?.last_page);

  useEffect(() => {
  }, []);

  const getPrevious = (event) => {
    event.preventDefault();
    setPageAndgetData(currentPage - 1);
  };
  const getNext = (event) => {
    event.preventDefault();
    if (currentPage >= lastPage) return;
    setPageAndgetData(currentPage + 1);
  }

  const setPageAndgetData = (selectedPage) => {
    props.getData(selectedPage);
  };

  return (

    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center mb-0">
        <li className={"page-item" + (currentPage <= 1 ? " disabled" : "")}>
          <a className="page-link" href="#" tabIndex="-1" onClick={getPrevious} aria-disabled={currentPage <= 1}>Previous</a>
        </li>
        {/* {<li className="page-item"><a className="page-link" href="#" onClick={() => setPageAndGetQueries(1)}>{currentPage - 1}</a></li>} */}
        <li className="page-item active"><a className="page-link" href="#">{currentPage}</a></li>
        {/* <li className="page-item"><a className="page-link" href="#" onClick={() => setPageAndGetQueries(1)}>{currentPage - 1}</a></li> */}
        <li className={"page-item" + (currentPage >= lastPage ? " disabled" : "")}>
          <a className="page-link" onClick={getNext} href="#">Next</a>
        </li>
      </ul>
      <div className="text-center mb-3 text-primary">{lastPage + " Pages"}</div>
    </nav>
  );
}
