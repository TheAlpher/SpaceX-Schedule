import React from "react";
import { Modal, Grid, Paper } from "@material-ui/core";
import ChipHOC from "../Chip/Chip";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import YouTubeIcon from "@material-ui/icons/YouTube";
import RedditIcon from "@material-ui/icons/Reddit";
import Wikipedia from "../../assets/svg/Wikipedia.svg";
import LanguageIcon from "@material-ui/icons/Language";
import {unixToutc} from '../../lib/util.js';
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
    padding: theme.spacing(4),
    width: "37.8vw",
    outline: 0,
    fontSize:14,
  },
  patch:{width:72},
  launch:{ fontWeight: "bold", fontSize: "18px" },
  hr: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  icon: { float: "right", marginRight: "1vw" },
  links: {
    fontSize: "xxx-small",
    textDecoration: "none",
    color: "gray",
  },
  linkWiki: { fontSize: 14, marginTop: "1vh" },
}));
const  InfoModal =({ data, visible, setVisible })=> {
  const classes = useStyles();
  React.useEffect(() => {
    console.log(data);
    console.log(moment(new Date()).subtract(7, "d").toISOString());
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
        <CloseIcon
          className={classes.icon}
          onClick={() => {
            setVisible(false);
          }}
        />
        <Grid className={classes.container}>
          <Grid item xs={3}>
            <img
              className={classes.patch}
              src={data?.links?.patch?.small || data?.links?.patch?.large}
            />
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <span className={classes.launch}>
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
            <Grid container>
              {data?.links?.reddit.campaign && (
                <a target="_blank"                   className={classes.links}
                href={data?.links?.reddit?.campaign}>
                  <RedditIcon />
                </a>
              )}{" "}
              &nbsp;
              {data?.links?.webcast && (
                <a
                  href={data?.links?.webcast}
                  target="_blank"
                 className={classes.links}
                >
                  <YouTubeIcon />
                </a>
              )}
              &nbsp;{" "}
              {data?.links?.wikipedia && (
                <a
                  href={data?.links?.wikipedia}
                  target="_blank"
                  className={classes.links}

                >
                  <img src={Wikipedia} width={24} />
                </a>
              )}
              &nbsp;
              {data?.links?.article && (
                <a
                  href={data?.links?.article}
                  target="_blank"
                  className={classes.links}

                >
                  <LanguageIcon />
                </a>
              )}
            </Grid>
          </Grid>
        </Grid>
        <p className={classes.linkWiki}>
          {data?.details}&nbsp;
          {data?.links?.wikipedia && (
            <a href={data?.links?.wikipedia} target="_blank">
              {" "}
              Wikipedia
            </a>
          )}
        </p>
        <div>
          <Grid container>
            <Grid item xs={6}>
              Flight Number
            </Grid>
            <Grid item xs={6}>
              {data?.flight_number}
            </Grid>
          </Grid>
          <hr className={classes.hr} />
          <Grid container>
            <Grid item xs={6}>
              Mission Name
            </Grid>
            <Grid item xs={6}>
              {data?.name}
            </Grid>
          </Grid>
          <hr className={classes.hr} />{" "}
          <Grid container>
            <Grid item xs={6}>
              Rocket Type
            </Grid>
            <Grid item xs={6}>
              {data?.rocket?.type}
            </Grid>
          </Grid>
          <hr className={classes.hr} />{" "}
          <Grid container>
            <Grid item xs={6}>
              Rocket Name
            </Grid>
            <Grid item xs={6}>
              {data?.rocket?.name}
            </Grid>
          </Grid>
          <hr className={classes.hr} />{" "}
          <Grid container>
            <Grid item xs={6}>
              Manafacturer
            </Grid>
            <Grid item xs={6}>
              {data?.rocket?.company}
            </Grid>
          </Grid>
          <hr className={classes.hr} />
          <Grid container>
            <Grid item xs={6}>
              Nationality
            </Grid>
            <Grid item xs={6}>
              {data?.rocket?.country}
            </Grid>
          </Grid>
          <hr className={classes.hr} />{" "}
          <Grid container>
            <Grid item xs={6}>
              Launch Date
            </Grid>
            <Grid item xs={6}>
              {unixToutc(data?.date_unix)}
            </Grid>
          </Grid>
          <hr className={classes.hr} />{" "}
          <Grid container>
            <Grid item xs={6}>
              Payload Type
            </Grid>
            <Grid item xs={6}>
              {data?.payloads[0]?.type}
            </Grid>
          </Grid>
          <hr className={classes.hr} />
          <Grid container>
            <Grid item xs={6}>
              Orbit{" "}
            </Grid>
            <Grid item xs={6}>
              {data?.payloads[0]?.orbit}
            </Grid>
          </Grid>
          <hr className={classes.hr} />
          <Grid container>
            <Grid item xs={6}>
              Launch Site
            </Grid>
            <Grid item xs={6}>
              {data?.launchpad?.name}
            </Grid>
          </Grid>
        </div>{" "}
      </Paper>
    </Modal>
  );
}
export default InfoModal;