import React from "react";
import { Select, Grid } from "@material-ui/core";
import {LAUNCH_FILTERS} from '../../lib/constants';
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
              {LAUNCH_FILTERS.map((ele)=>{
                return(
                  <option key={ele.key} value={ele.key}>{ele.name}</option>
                )
              })}
            </select>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
