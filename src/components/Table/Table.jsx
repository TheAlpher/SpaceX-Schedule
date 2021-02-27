import React, { useContext } from "react";
import TableContext from "../../context/TableContext";
import moment from "moment";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import ChipHOC from "../chip/chip";
import Spinner from "assets/svg/Spinner.svg";
import "./Table.css";
const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: "lightgray",
      fontSize: 12,
      padding: "12px",
      //   color: black,
    },
    body: {
      fontSize: 12,
      borderBottom: "none",
      padding: "12px",
    },
  })
)(TableCell);

// const StyledTableRow = withStyles((theme) =>
//   createStyles({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }),
// )(TableRow);

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  table: {
    width: "66vw",
    // minHeight:'61vh',
    height: "61vh",
    maxHeight: "61vh",
    border: "1px solid lightgray",
    borderRadius: "10px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  loader: {
    height: "150px",
  },
  loaderCell: {
    textAlign: "center",
  },
});

export default function DataTable(props) {
  const { loading, data, pageNo, pageSize } = useContext(TableContext);
  const classes = useStyles();

  React.useEffect(() => {
    console.log(data);
  });
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No.</StyledTableCell>
            <StyledTableCell align="left">Launched (UTC)</StyledTableCell>
            <StyledTableCell align="left">Location</StyledTableCell>
            <StyledTableCell align="left">Mission</StyledTableCell>
            <StyledTableCell align="center">Orbit</StyledTableCell>
            <StyledTableCell align="center">Launch Status</StyledTableCell>{" "}
            <StyledTableCell align="left">Rocket</StyledTableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <img src={Spinner} className={classes.loader} />
        ) : (
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index + 1}>
                <StyledTableCell align="center">
                  {index * 12 + 1}
                </StyledTableCell>
                <StyledTableCell>
                  {!row.upcoming && !row.success
                    ? moment(
                        new Date(row.date_unix * 1000).toUTCString()
                      ).format("D MMMM YYYY [at] h:mm")
                    : moment(
                        new Date(row.date_unix * 1000).toUTCString()
                      ).format("D MMMM YYYY h:mm")}
                </StyledTableCell>

                <StyledTableCell>{row.launchpad.name}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {row?.payloads[0]?.orbit}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ChipHOC
                    lvar={row.upcoming ? "upcoming" : "success"}
                    lval={row.upcoming ? row.upcoming : row.success}
                  />
                </StyledTableCell>
                <StyledTableCell>{row?.rocket?.name}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
