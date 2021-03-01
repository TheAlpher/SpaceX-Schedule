import React, { useContext } from "react";
import { Pagination } from "@material-ui/lab";
import TableContext from "../../context/TableContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: { display: "flex", justifyContent: "center", marginTop: "1vh" },
  wrapper: { display: "flex", justifyContent: "flex-end", width: "66vw" },
}));
export default function PaginationHOC() {
  const { setPage, pageNo, totalDocs, pageSize } = useContext(TableContext);
  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
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
