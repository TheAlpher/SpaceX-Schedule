import React, { useContext , useState} from "react";
import { Select, Grid } from "@material-ui/core";
import TableContext from "../../context/TableContext";
import DurationModal from '../DurationModal/DurationModal';
import { LAUNCH_FILTERS,DURATION_FILTERS } from "../../lib/constants";
export default function SubHeader() {
  const { loading, launchFilter, updateLaunchFilter,duration,rangeFrom, rangeTo,updateDurationFilter } = useContext(TableContext);
const [durationModal,setDurationModal]=useState(false);
  return (
    <Grid
      container
      justify="center"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <Grid style={{ width: "66vw" }} container justify="space-between">
        <Grid item style={{cursor:'pointer'}} onClick={()=>{
          setDurationModal(!durationModal);
        }}>{DURATION_FILTERS[duration]?.label  || "Custom"} &#709;</Grid>
        <DurationModal visible={durationModal} durationType={duration} rangeFrom={rangeFrom} rangeTo={rangeTo} updateDurationFilter={updateDurationFilter} setVisible={setDurationModal} />
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
