import React, { useContext, useState } from "react";
import TableContext from "context/TableContext";
import moment from "moment";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@material-ui/core";
import ChipHOC from "components/Chip/Chip";
import InfoModal from "components/InfoModal/InfoModal";
import Spinner from "assets/svg/Spinner.svg";

const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: "lightgray",
      fontSize: 12,
      padding: "10px",
    },
    body: {
      fontSize: 12,
      borderBottom: "none",
      padding: "10px",
    },
  })
)(TableCell);

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    minHeight: "66vh",
    height: "66vh",
    overflow: "auto",
    width: "66.1vw",
    border: "1px solid lightgray",
    borderRadius: "10px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },

  loaderContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
  },
  loader: {
    height: "150px",
  },
  loaderCell: {
    textAlign: "center",
  },

  messageDiv: {
    display: "none",
  },
  tableRow: { cursor: "pointer" },
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
/**
 * Set Modal Data using index of Data Row and Toggle Modal
 * @param {number} index Index of Table Data Row clicked on
 */
  const loadModal = async (index) => {
    await setModalData(data[index]);
    await setModalVisible(!modalVisible);
  };
/**
 * Convert one digit numbers to 2 digits by appending before them for table Serial No.
 * @param {number} j 
 */

  const numberToDay = (j) => {
    return ("0" + j).slice(-2);
  };
/**
 * Render Loader when the loading flag state is set to true
 */

  const renderLoader = () => {
    if (loading) {
      return (
        <Grid container className={classes.loaderContainer}>
          <img src={Spinner} className={classes.loader} />
        </Grid>
      );
    } else return null;
  };
/**
 * Render No results message when the data length is 0 and loading flag is set to false
 * @param {Array} data 
 */
  const renderNoData = (data) => {
    if (!loading && data?.length == 0)
      return (
        <Grid container className={classes.loaderContainer}>
          <span>No results found for the specified filter</span>
        </Grid>
      );
    else return null;
  };

  /**
   * Render Rows of table body using  data state from provider
   * @param {Array} data 
   */
  const renderRows = (data) => {
    if (!loading) {
      return data.map((row, index) => {
        const input = (pageNo - 1) * pageSize + index + 1;
        const rowSerial = numberToDay(input);
        return (
          <TableRow
            key={index + 1}
            className={classes.tableRow}
            onClick={() => {
              loadModal(index);
            }}
          >
            <StyledTableCell align="center">{rowSerial}</StyledTableCell>
            <StyledTableCell>
              {!row.upcoming && !row.success
                ? moment(new Date(row.date_unix * 1000).toUTCString()).format(
                    "D MMMM YYYY [at] h:mm"
                  )
                : moment(new Date(row.date_unix * 1000).toUTCString()).format(
                    "D MMMM YYYY h:mm"
                  )}
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
      });
    } else return null;
  };
  return (
    <React.Fragment>
      <InfoModal
        classFields={classes.paper}
        data={modalData}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <div className={classes.wrapper}>
        <TableContainer className={classes.container}>
          <Table aria-label="customized table">
            <colgroup>
              <col width="7%" />
              <col width="20%" />
              <col width="16%" />
              <col width="17%" />
              <col width="10%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">No.</StyledTableCell>
                <StyledTableCell align="left">Launched (UTC)</StyledTableCell>
                <StyledTableCell align="left">Location</StyledTableCell>
                <StyledTableCell align="left">Mission</StyledTableCell>
                <StyledTableCell align="center">Orbit</StyledTableCell>
                <StyledTableCell align="center">Launch Status</StyledTableCell>
                <StyledTableCell align="left">Rocket</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody
              className={(loading || data?.length == 0) && classes.messageDiv}
            >
              {renderRows(data)}
            </TableBody>
          </Table>
          {renderLoader()}
          {renderNoData(data)}
        </TableContainer>
      </div>{" "}
    </React.Fragment>
  );
}
