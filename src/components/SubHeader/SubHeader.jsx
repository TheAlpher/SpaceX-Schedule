import React, { useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import TableContext from "context/TableContext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import DurationModal from "components/DurationModal/DurationModal";
import { LAUNCH_FILTERS, DURATION_FILTERS } from "lib/constants";
import filterSvg from "assets/svg/filter.svg";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  select: {
    border: "unset",
    outline: 0,
  },
  container: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  row: {
    width: "66vw",
  },
  cursor: {
    cursor: "pointer",
  },
  calendar: { fontSize: "1rem" },
  flexBox: {
    display: "flex",
  },
}));
export default function SubHeader() {
  const {
    launchFilter,
    updateLaunchFilter,
    durationFilter,
    rangeFrom,
    rangeTo,
    updateDurationFilter,
  } = useContext(TableContext);
  const classes = useStyles();
  const [durationModal, setDurationModal] = useState(false);
  return (
    <Grid container justify="center" className={classes.container}>
      <Grid className={classes.row} container justify="space-between">
        <Grid
          item
          className={classes.cursor}
          onClick={() => {
            setDurationModal(!durationModal);
          }}
        >
          <CalendarTodayOutlinedIcon className={classes.calendar} />
          &nbsp;{DURATION_FILTERS[durationFilter]?.label || "Custom"}{" "}
          <ExpandMoreIcon />
        </Grid>
        <DurationModal
          visible={durationModal}
          durationFilter={durationFilter}
          rangeFrom={rangeFrom}
          rangeTo={rangeTo}
          updateDurationFilter={updateDurationFilter}
          setVisible={setDurationModal}
        />
        <Grid item>
          <div className={classes.flexBox}>
            <img src={filterSvg} />
            <select
              className={classes.select}
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
