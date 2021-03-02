import React from "react";
import { Modal, Grid, Paper } from "@material-ui/core";
import { DURATION_FILTERS } from "lib/constants";
import RangePicker from "components/RangePicker/RangePicker.jsx";
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
  listItem: {
    cursor: "pointer",
    padding: "5px 0",
  },
  borderRight: {
    borderRight: "1px solid lightgray",
  },

  icon: { float: "right", marginRight: "1vw" },
}));
export default function DurationModal({
  visible,
  setVisible,
  durationFilter,
  updateDurationFilter,
  rangeFrom,
  rangeTo,
}) {
  const classes = useStyles();

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
          <Grid item xs={3} className={classes.borderRight}>
            <ul className={classes.list}>
              {Object.keys(DURATION_FILTERS).map((ele) => {
                return (
                  <li
                    onClick={() => {
                      updateDurationFilter(ele);
                      setVisible(false);
                    }}
                    className={classes.listItem}
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
              durationFilter={durationFilter}
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
