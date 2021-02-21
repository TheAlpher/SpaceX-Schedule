import React, { Component } from "react";
import TableContext from "./TableContext";
import { validLaunchFilterCheck } from "../lib/util";
import { LAUNCH_FILTERS } from "../lib/constants";
import axios from "axios";
const launchFilters = [];
class TableProvider extends Component {
  state = {
    data: [],
    loading: false,
    pageNo: 1,
    perPage: 12,
    launchFilter: 0,
  };
  loadState = async () => {
    this.setState({ loading: true });
    await this.setLaunchFilter();
    await this.setTableData();
    this.setState({ loading: false });
  };

  setTableData = async () => {
    const queryObj = this.returnQueryObj();
    const optionsObj = {
      limit: this.state.perPage,
      offset: this.state.perPage * (this.state.pageNo - 1),
    };
    console.log(queryObj);
    axios
      .post("https://api.spacexdata.com/v4/launches/query", {
        query: queryObj,
        options: optionsObj,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  returnQueryObj = () => {
    if (this.state.launchFilter == 1 || this.state.launchFilter == 2) {
      const validFilterObj = LAUNCH_FILTERS.find((ele) => {
        return ele.key == this.state.launchFilter;
      });
      let queryObj = {};
      queryObj[validFilterObj.value] = true;
      return queryObj;
    } else if (this.state.launchFilter == 3) {
      const validFilterObj = LAUNCH_FILTERS.find((ele) => {
        return ele.key == 2;
      });
      let queryObj = {};
      queryObj[validFilterObj.value] = false;
      return queryObj;
    } else return {};
  };
  setLaunchFilter = async () => {
    let url = new URL(window.location);
    let launchVal = url.searchParams.get("launch");
    console.log(launchVal);

    if (launchVal) {
      let parsedVal = parseInt(launchVal);
      if (validLaunchFilterCheck(parsedVal)) {
        this.setState({ launchFilter: parseInt(launchVal) }, () => {
          console.log(this.state.launchFilter);
        });
      }
    }
  };

  updatePageNo = async (num) => {
    this.setState({ pageNo: num }, () => {
      this.setTableData();
    });
  };
  updateLaunchFilter = async (val) => {
    this.setState(
      {
        launchFilter: val,
      },
      () => {
        let url = new URL(window.location);
        url.searchParams.set(`launch`, `${this.state.launchFilter}`);
        window.history.pushState({ path: url.href }, "", url.href);
        this.setTableData();
      }
    );
  };

  setPage = async (num) => {
    this.setState({
      pageNo: num,
    });
  };

  componentDidMount() {
    this.loadState();
  }
  render() {
    return (
      <TableContext.Provider
        value={{
          data: this.state.data,
          loading: this.state.loading,
          pageNo: this.state.pageNo,
          perPage: this.state.perPage,
          launchFilter: this.state.launchFilter,
          updateLaunchFilter: this.updateLaunchFilter,
        }}
      >
        {this.props.children}
      </TableContext.Provider>
    );
  }
}
export default TableProvider;
