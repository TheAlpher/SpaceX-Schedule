import React, { useContext } from "react";
import TableContext from "../../context/TableContext";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import Spinner from "assets/svg/Spinner.svg";
import "./Table.css";
const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: "lightgray",
      //   color: black,
    },
    body: {
      fontSize: 14,
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
  },
  loader: {
    height: "150px",
  },
  loaderCell: {
    textAlign: "center",
  },
});

export default function DataTable(props) {
  const { loading } = useContext(TableContext);
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    console.log(props?.location?.search);
  });
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">No.</StyledTableCell>
            <StyledTableCell align="left">Launched (UTC)</StyledTableCell>
            <StyledTableCell align="left">Location</StyledTableCell>
            <StyledTableCell align="left">Mission</StyledTableCell>
            <StyledTableCell align="left">Orbit</StyledTableCell>
            <StyledTableCell align="left">Launch Status</StyledTableCell>{" "}
            <StyledTableCell align="left">Orbit</StyledTableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <img src={Spinner} className={classes.loader} />
        ) : (
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.calories}</StyledTableCell>
                <StyledTableCell>{row.fat}</StyledTableCell>
                <StyledTableCell>{row.carbs}</StyledTableCell>
                <StyledTableCell>{row.protein}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
