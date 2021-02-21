import React, { useContext } from "react";
import { Select, Grid } from "@material-ui/core";
import TableContext from "../../context/TableContext";

import { LAUNCH_FILTERS } from "../../lib/constants";
export default function SubHeader() {
  const { loading, launchFilter, updateLaunchFilter } = useContext(TableContext);

  return (
    <Grid
      container
      justify="center"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <Grid style={{ width: "66vw" }} container justify="space-between">
        <Grid item>Duration Filter</Grid>
        <Grid item>
          <div className="launches-select">
            <select
              value={launchFilter}
              onChange={(e) => {
                updateLaunchFilter(e.target.value);
              }}
            >
              {LAUNCH_FILTERS.map((ele) => {
                return (
                  <option key={ele.key} value={ele.key}>
                    {ele.name}
                  </option>
                );
              })}
            </select>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
