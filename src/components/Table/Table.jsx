import React, { useContext, useState } from "react";
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
import InfoModal from "../InfoModal/InfoModal";
import Spinner from "assets/svg/Spinner.svg";
import "./Table.css";
const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: "lightgray",
      fontSize: 12,
      padding: "10px",
      //   color: black,
    },
    body: {
      fontSize: 12,
      borderBottom: "none",
      padding: "10px",
    },
  })
)(TableCell);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  table: {
    width: "66vw",
    // minHeight:'61vh',

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
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: "5px",
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

export default function DataTable(props) {
  const { loading, data, pageNo, pageSize } = useContext(TableContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const classes = useStyles();

  const loadModal = async (index) => {
    await setModalData(data[index]);
    await setModalVisible(!modalVisible);
  };
  const numberToDay = (j) => {
    return ("0" + j).slice(-2);
  };
  React.useEffect(() => {
    console.log(data);
  });
  return (
    <React.Fragment>
      <InfoModal
        classFields={classes.paper}
        data={modalData}
        visible={modalVisible}
        setVisible={setModalVisible}
      />

      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No.</StyledTableCell>
              <StyledTableCell align="left">Launched (UTC)</StyledTableCell>
              <StyledTableCell align="left">Location</StyledTableCell>
              <StyledTableCell align="left">Mission</StyledTableCell>
              <StyledTableCell align="center">Orbit</StyledTableCell>
              <StyledTableCell align="center">
                Launch Status
              </StyledTableCell>{" "}
              <StyledTableCell align="left">Rocket</StyledTableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <img src={Spinner} className={classes.loader} />
          ) : (
            <TableBody>
              {data.map((row, index) => {
                const input = (pageNo - 1) * pageSize + index + 1;
                const rowSerial = numberToDay(input);
                return (
                  <TableRow
                    key={index + 1}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      loadModal(index);
                    }}
                  >
                    <StyledTableCell align="center">
                      {rowSerial}
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
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
