import React, { useContext } from "react";
import "./Pagination.css";
import { Pagination } from "@material-ui/lab";
import TableContext from "../../context/TableContext";
export default function PaginationHOC() {
  const { loading, setPage, pageNo, totalDocs, pageSize } = useContext(
    TableContext
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" ,marginTop:'1vh'}}>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "66vw" }}
      >
        <Pagination
          count={Math.ceil(totalDocs / pageSize)}
          defaultPage={pageNo}
          page={pageNo}
          shape="rounded"
          variant="outlined"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
