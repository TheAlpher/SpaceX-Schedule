import React from "react";
import { Select, Grid } from "@material-ui/core";
export default function SubHeader() {
  return (
    <Grid container justify='center' style={{paddingTop:'2rem',paddingBottom:'2rem'}} >
      <Grid style={{ width: "66vw" }} container justify='space-between'>
          <Grid item>
              Duration Filter
          </Grid>
        <Grid item>
          <div className="launches-select">
            <select defaultValue={0}>
              <option value={0}>All launches</option>
              <option value={1}>Upcoming Launches</option>
              <option value={2}>Successful Launches</option>
              <option value={3}>Failed Launches</option>
            </select>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
