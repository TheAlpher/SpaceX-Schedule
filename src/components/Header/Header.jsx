import React from "react";
import logo from "assets/svg/spacex.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100vw",
    height: "7vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    height: "3.125vh",
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} />
    </div>
  );
};
export default Header;
