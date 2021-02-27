import React from "react";
import { Modal, Grid, Paper } from "@material-ui/core";
import ChipHOC from "../chip/chip";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    gridGap: theme.spacing(2),
    paddingTop: "1vh",
  },
  paper: {
    padding: theme.spacing(4),
    width: 544,
    outline: 0,
  },
  icon: { float: "right", marginRight: "1vw" },
}));
export default function InfoModal({ classFields, data, visible, setVisible }) {
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
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} className={classes.paper}>
        <CloseIcon
          className={classes.icon}
          onClick={() => {
            setVisible(false);
          }}
        />
        <Grid className={classes.container}>
          <Grid item xs={3}>
            <img
              style={{ width: 72 }}
              src={data?.links?.patch?.small || data?.links?.patch?.large}
            />
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {" "}
                {data?.name}
              </span>
              &nbsp; &nbsp;
              <ChipHOC
                lvar={data?.upcoming ? "upcoming" : "success"}
                lval={data?.upcoming ? data?.upcoming : data?.success}
              />
            </Grid>
            {data?.rocket.name}
            <Grid container></Grid>
          </Grid>
        </Grid>
        <p style={{ fontSize: 14, marginTop: "1vh" }}>
          {data?.details}{" "}
          {data?.links?.wikipedia && (
            <a href={data?.links?.wikipedia}> Wikipedia</a>
          )}
        </p>
        <Grid container>
          <Grid item xs={6}>
            Flight Number
          </Grid>
          <Grid item xs={6}>
            {data?.flight_number}
          </Grid>
        </Grid>
        <hr />
        <Grid container>
          <Grid item xs={6}>
            Mission Name
          </Grid>
          <Grid item xs={6}>
            {data?.name}
          </Grid>
        </Grid>
        <hr />{" "}
        <Grid container>
          <Grid item xs={6}>
            Rocket Type
          </Grid>
          <Grid item xs={6}>
            {data?.rocket?.type}
          </Grid>
        </Grid>
        <hr />{" "}
        <Grid container>
          <Grid item xs={6}>
            Rocket Name
          </Grid>
          <Grid item xs={6}>
            {data?.rocket?.name}
          </Grid>
        </Grid>
        <hr />{" "}
        <Grid container>
          <Grid item xs={6}>
            Manafacturer
          </Grid>
          <Grid item xs={6}>
            {data?.rocket?.company}
          </Grid>
        </Grid>
        <hr />
        <Grid container>
          <Grid item xs={6}>
            Nationality
          </Grid>
          <Grid item xs={6}>
            {data?.rocket?.country}
          </Grid>
        </Grid>
        <hr />{" "}
        <Grid container>
          <Grid item xs={6}>
            Launch Date
          </Grid>
          <Grid item xs={6}>
            {moment(new Date(data?.date_unix * 1000).toUTCString()).format(
              "D MMMM YYYY hh:mm"
            )}
          </Grid>
        </Grid>
        <hr />{" "}
        <Grid container>
          <Grid item xs={6}>
            Payload Type
          </Grid>
          <Grid item xs={6}>
            {data?.payloads[0]?.type}
          </Grid>
        </Grid>
        <hr />
        <Grid container>
          <Grid item xs={6}>
            Orbit{" "}
          </Grid>
          <Grid item xs={6}>
            {data?.payloads[0]?.orbit}
          </Grid>
        </Grid>
        <hr />
        <Grid container>
          <Grid item xs={6}>
            Launch Site
          </Grid>
          <Grid item xs={6}>
            {data?.launchpad?.name}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
