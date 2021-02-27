import React from "react";
import { STATUS_TYPES } from "lib/constants";
import { Chip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
 
    label: {
     fontWeight:'bold',
    },
  }));
export default function ChipHOC({ lvar, lval }) {
  

const classes = useStyles();

  const statusObj = STATUS_TYPES.find((obj) => {
    return obj.variable == lvar && obj.value == lval;
  });
  return (
    <Chip
    label={statusObj.label}
    classes={{
        label:classes.label
    }}
      style={{
        color: statusObj.color,
        backgroundColor: statusObj.backgroundColor,
      }}
    />
  );
}
