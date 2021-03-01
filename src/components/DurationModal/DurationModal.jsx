import React from "react";
import { Modal, Grid, Paper } from "@material-ui/core";
import { DURATION_FILTERS } from "../../lib/constants";
import RangePicker from "../rangePicker/rangePicker";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    paddingTop: "1vh",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    width: "42.9vw",
    outline: 0,
    minHeight: "32vh",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    margin: 0,
  },
  icon: { float: "right", marginRight: "1vw" },
}));
export default function DurationModal({
  data,
  visible,
  setVisible,
  durationType,
  updateDurationFilter,
  rangeFrom,
  rangeTo,
}) {
  const classes = useStyles();
  React.useEffect(() => {
    console.log(data);
  });

  return (
    <Modal
      open={visible}
      onClose={() => {
        setVisible(false);
      }}
      className={classes.modal}
    >
      <Paper elevation={3} className={classes.paper}>
        <Grid className={classes.container}>
          <Grid item xs={3} style={{ borderRight: "1px solid lightgray" }}>
            <ul className={classes.list}>
              {Object.keys(DURATION_FILTERS).map((ele) => {
                return (
                  <li
                    onClick={() => {
                      updateDurationFilter(ele);
                      setVisible(false);
                    }}
                    style={{ cursor: "pointer" }}
                    key={DURATION_FILTERS[ele]?.value}
                  >
                    {DURATION_FILTERS[ele]?.modalLabel}
                  </li>
                );
              })}
            </ul>
          </Grid>
          <Grid item xs={9}>
            <RangePicker
              setVisible={setVisible}
              durationType={durationType}
              rangeFrom={rangeFrom}
              updateDurationFilter={updateDurationFilter}
              rangeTo={rangeTo}
            />
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
